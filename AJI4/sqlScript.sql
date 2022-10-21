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
SELECT * FROM categories;
INSERT INTO categories (NAME) VALUES ('food');
INSERT INTO categories (NAME) VALUES ('alcohol');
INSERT INTO categories (NAME) VALUES ('cosmetics');
INSERT INTO categories (NAME) VALUES ('electronics');