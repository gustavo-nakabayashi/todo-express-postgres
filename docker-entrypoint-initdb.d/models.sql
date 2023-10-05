CREATE TABLE users(
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  user_id uuid,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

