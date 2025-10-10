import { ref, computed, watch, reactive } from "vue";
import { defineStore } from "pinia";
import {
  type Note,
  type CreateNoteDTO,
  type SortOption,
  SORT_BY,
  SORT_ORDER,
} from "@/types";
import { notesService } from "@/services/notes";
import router from "@/router";
import { useRoute } from "vue-router";

export const useNotesStore = defineStore("notes", () => {
  const route = useRoute();

  // State
  const notes = ref<Note[]>([]);
  const loading = ref<boolean>(false);

  const formError = ref<string | null>(null);
  const fetchError = ref<string | null>(null);
  const deleteError = ref<string | null>(null);

  const searchQuery = ref<string>();
  const sortOption = reactive<SortOption>({
    sortBy: route.query['sortBy'] || "created_at",
    order: route.query['order'] || "DESC",
  });

  // Computed(getters)
  const getCount = computed(() => notes.value.length);

  // Actions(setters)
  const fetchNotes = async () => {
    loading.value = true;
    fetchError.value = null;
    try {
      const response = await notesService.getAll({
        search: searchQuery.value || undefined,
        ...sortOption,
      });

      notes.value = response.data || [];
    } catch (err: any) {
      fetchError.value = err.response?.data?.message || "Failed to fetch notes";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createNote = async (data: CreateNoteDTO) => {
    loading.value = true;
    formError.value = null;
    try {
      const response = await notesService.create(data);
      if (response.success) {
        fetchNotes();
      }
      return response.data;
    } catch (err: any) {
      formError.value = err.response?.data?.message || "Failed to create note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateNote = async ({id, ...data}: Note) => {
    loading.value = true;
    formError.value = null;

    try {
      const response = await notesService.update(id, data);
      const index = notes.value.findIndex((note) => note.id === id);
      if (index !== -1 && response.data) {
        fetchNotes();
      }
      return response.data;
    } catch (err: any) {
      formError.value = err.response?.data?.message || "Failed to update note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteNote = async (id: number) => {
    loading.value = true;
    deleteError.value = null;
    try {
      const response = await notesService.delete(id);
      if (response.success) {
        fetchNotes();
      }
    } catch (err: any) {
      deleteError.value = err.response?.data?.message || "Failed to delete note";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const pushRouteQuery = (query: Record<string, any>) =>  router.push({ query: { ...route.query, ...query } });

  const setSearch = (query?: string) => {
    searchQuery.value = query || "";
    pushRouteQuery({ search: searchQuery.value || undefined }).then(() => { fetchNotes() });
  };

  const setSort = (option?: SortOption) => {
    if (option?.order) sortOption.order = option.order;
    if (option?.sortBy) sortOption.sortBy = option.sortBy;
    pushRouteQuery({...sortOption}).then(() => { fetchNotes() });
  };

  watch(
    () => route.query,
    (newQuery, oldQuery) => {
      if (JSON.stringify(newQuery) === JSON.stringify(oldQuery)) return;

      const newSearch = newQuery['search'] ?? "";
      const newSort = { sortBy: newQuery['sortBy'] ?? 'created_at', order: newQuery['order'] ?? 'DESC' };

      if (searchQuery.value === newSearch && sortOption.order === newSort.order && sortOption.sortBy && newSort.sortBy) return;

      searchQuery.value = typeof newSearch === "string" ? newSearch : "";
      sortOption.sortBy = SORT_BY.includes(newSort.sortBy as typeof SORT_BY[number]) ? newSort.sortBy as typeof SORT_BY[number] : 'created_at';
      sortOption.order = SORT_ORDER.includes(newSort.order as typeof SORT_ORDER[number]) ? newSort.order as typeof SORT_ORDER[number] : 'DESC';

      fetchNotes();
    },
    { deep: true, immediate: false }
  );

  return {
    // State
    notes,
    loading,
    formError,
    fetchError,
    deleteError,
    searchQuery,
    sortOption,

    // Getters
    getCount,

    // Actions
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setSearch,
    setSort,
  };
});
