-- =========================================================
-- Datos de ejemplo: 4 productos
-- El id no se escribe: lo genera PostgreSQL (UUID)
-- =========================================================

INSERT INTO products (name, description, price, stock, image_url) VALUES
    ('Teclado mecánico',  'Teclado compacto 75% con switches marrones',     89.90, 15, '/img/teclado.svg'),
    ('Ratón inalámbrico', 'Ratón ergonómico con conexión Bluetooth',        34.50, 30, '/img/raton.svg'),
    ('Monitor 27"',       'Monitor IPS 1440p a 144 Hz',                    279.00,  8, '/img/monitor.svg'),
    ('Auriculares',       'Auriculares over-ear con cancelación de ruido', 129.99, 12, '/img/auriculares.svg');
