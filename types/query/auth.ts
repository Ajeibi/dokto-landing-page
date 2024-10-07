export interface QueryResponse<T> {
      success: boolean;
      message: string;
      data:    T;
    }