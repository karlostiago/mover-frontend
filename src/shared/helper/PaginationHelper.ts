export class PaginationHelper<T, R> {

    page = 0;
    size = 100;
    totalPages = 0;
    hasMore = true;
    loading = false;

    initialization(pageSize: number = 100) {
        this.size = pageSize;
    }

    reset() {
        this.page = 0;
        this.totalPages = 0;
        this.hasMore = true;
        this.loading = false;
    }

    next() {
        this.page++;
    }

    load (service: () => Promise<R> , onSuccess: (response: R) => void, onError?: (error: any) => void) {
        if (this.loading || !this.hasMore) return;

        this.loading = true;

        service().then(response => {
            onSuccess(response);
            this.updateResponse(response as any);
            this.next();
            this.loading = false;
        }).catch(error => {
            this.loading = false;
            if (onError) {
                onError(error);
            }
        });
    }

    updateResponse(response: R & { totalPages: number }): void {
        this.totalPages = response.totalPages;
        this.hasMore = (this.page + 1) < this.totalPages;
    }
}
