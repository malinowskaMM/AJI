CREATE TABLE public.categories
(
    NAME text NOT NULL,
    PRIMARY KEY (NAME)
);

CREATE TABLE public.products
(
    ID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    NAME text NOT NULL,
    DESCRIPTION text NOT NULL,
    PRICE double precision NOT NULL,
    WEIGHT double precision NOT NULL,
    CATEGORY text NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT CATEGORY FOREIGN KEY (CATEGORY)
        REFERENCES public.categories (NAME)
);

CREATE TABLE public.order_status
(
    NAME text NOT NULL,
    PRIMARY KEY (NAME)
);

CREATE TABLE public.orders
(
    ID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    APPROVED_DATE date,
    STATUS text NOT NULL,
    USERNAME text NOT NULL,
    EMAIL text NOT NULL,
    PHONE_NUMBER text NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (STATUS)
        REFERENCES public.order_status (NAME)
);

CREATE TABLE public.order_details
(
    ID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    PRODUCT_ID integer NOT NULL,
    ORDER_ID integer NOT NULL,
    NUMBER integer NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (PRODUCT_ID)
        REFERENCES public.products (ID),
    FOREIGN KEY (ORDER_ID)
        REFERENCES public.orders (ID)
);

INSERT INTO order_status (NAME) VALUES('UNAPPROVED');
INSERT INTO order_status (NAME) VALUES('APPROVED');
INSERT INTO order_status (NAME) VALUES('CANCELED');
INSERT INTO order_status (NAME) VALUES('COMPLETED');
INSERT INTO categories (NAME) VALUES ('food');
INSERT INTO categories (NAME) VALUES ('alcohol');
INSERT INTO categories (NAME) VALUES ('cosmetics');
INSERT INTO categories (NAME) VALUES ('electronics');
INSERT INTO products (name, description, price, weight, category)
VALUES ('onion', 'you will cry after this', 5, 2, 'food');
INSERT INTO products (name, description, price, weight, category)
VALUES ('potato', 'sweet straight from the ground', 15, 3, 'food');
INSERT INTO products (name, description, price, weight, category)
VALUES ('lipstick', 'red color', 50, 1, 'cosmetics');
INSERT INTO orders (approved_date, status, username, email, phone_number)
VALUES (now() - interval '5 days', 'APPROVED', 'TheUser21', 'user@gmail.com', '754321234');
INSERT INTO orders (approved_date, status, username, email, phone_number)
VALUES (null, 'UNAPPROVED', 'TheUser22', 'user2@gmail.com', '222222222');
INSERT INTO order_details (product_id, order_id, number) VALUES
(1, 1, 5);
INSERT INTO order_details (product_id, order_id, number) VALUES
(2, 1, 2);
INSERT INTO order_details (product_id, order_id, number) VALUES
(1, 2, 1);
