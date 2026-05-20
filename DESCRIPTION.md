# Project Notes

## Setup & Running

1. **Start the server and database:**
   ```bash
   pnpm dev
   ```

2. **Seed the database:**
   This will clear existing data and insert an admin user, a normal user, and some sample products.
   ```bash
   pnpm run seed
   ```
   * **Admin Credentials:** `admin` / `admin123`
   * **User Credentials:** `user` / `user123`

## Testing

A `postman_collection.json` is included in the root directory. 
It includes a pre-configured script on the Login endpoints that automatically extracts the JWT and sets it as a collection variable, so you don't have to manually copy and paste the Bearer token for the protected Product routes.
