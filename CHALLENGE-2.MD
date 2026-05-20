# SQL Query

```sql
SELECT id, name, category, price, quantity, created_at, updated_at
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET 0; -- offset is the page number - 1 * limit
```

*Note:* Using offset will still have to compute all the skipped rows so for large tables cursor based pagination should be used

# NoSQL Query

```js
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .skip(0) // skip is calculated the same as offset in the SQL Query
  .limit(5);
```

# Optimization

## Indexing

### PostgreSQL

```sql
CREATE INDEX idx_products_price ON products(price);
```
You need a B-Tree index on price because the query uses a range and orders by that same column, the index does both the filtering and the sorting simultaneously. it makes the scan from $O(N)$ into an $O(\log N)$ lookup.

### MongoDB

```js
db.products.createIndex({ category: 1, price: -1 });
```

You need a compound index following the ESR (Equality, Sort, Range) rule. By putting the exact match (category: 1) first and the sort (price: -1) second, MongoDB instantly filters and reads the pre-sorted data, completely avoiding a slow and expensive in-memory sort.

## Caching

Use Redis to cache the paginated results with specific keys like `products:category:electronics:page:1`. When a product is added or updated just delete the cached keys for that specific category so the data stays fresh. This keeps the database from getting spammed by repeated reads during high traffic.