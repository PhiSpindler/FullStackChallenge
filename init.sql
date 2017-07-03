CREATE TABLE tasks (
  ID SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  duedate DATE,
  priority SMALLINT DEFAULT 0 NOT NULL,
  status BOOLEAN DEFAULT true NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT now(),
  updatedAt TIMESTAMP NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customer_modtime BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();
