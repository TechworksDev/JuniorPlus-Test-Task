export interface Note {
    id: string;
    name: string;
    content: string;
}

export interface CreateNoteDTO {
    name: string;
    content: string;
}

export interface UpdateNoteDTO {
    name?: string;
    content?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}