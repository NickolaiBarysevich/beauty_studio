package com.bsuir.kareley.util;

import java.util.List;

public class PaginatedQuery<T> {

    private List<T> list;
    private int totalRows;

    public PaginatedQuery(List<T> list, int totalRows) {
        this.list = list;
        this.totalRows = totalRows;
    }

    public List<T> getList() {
        return list;
    }

    public int getTotalRows() {
        return totalRows;
    }
}
