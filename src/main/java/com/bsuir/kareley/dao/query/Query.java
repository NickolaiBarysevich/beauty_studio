package com.bsuir.kareley.dao.query;

import java.util.Arrays;
import java.util.Objects;

public class Query {

    private String query;
    private Object[] parameters;

    public Query(String query, Object... parameters) {
        this.query = query;
        this.parameters = parameters;
    }

    public String getQuery() {
        return query;
    }

    public Object[] getParameters() {
        return parameters;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Query query1 = (Query) o;
        return Objects.equals(query, query1.query) &&
                Arrays.equals(parameters, query1.parameters);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(query);
        result = 31 * result + Arrays.hashCode(parameters);
        return result;
    }
}
