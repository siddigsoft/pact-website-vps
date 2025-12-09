-- Seed client_content table with sample data

INSERT INTO client_content (name, type, order_index) VALUES
-- Clients
('United Nations Development Programme (UNDP)', 'client', 1),
('The World Bank (WB)', 'client', 2),
('World Food Program (WFP)', 'client', 3),
('International Fund for Agricultural Development (IFAD)', 'client', 4),
('UN High Commission for Refugees (UNHCR)', 'client', 5),
('UN Women', 'client', 6),
('International Organization for Migration (IOM)', 'client', 7),
('Japan Agency for International Development (JICA)', 'client', 8),
('British Council', 'client', 9),
('Central Bank of Sudan', 'client', 10),
('Microfinance Institutions', 'client', 11),
('Sudan Peace Development Project (SPDP)', 'client', 12),

-- Business Associates/Partners
('National Universities, Research & Strategic Planning Centers, Sudan', 'partner', 1),
('AFC Consultants International, Germany', 'partner', 2),
('Frankfurt School of Finance & Management, Germany', 'partner', 3),
('BOTHO Limited, Nairobi, Kenya and UAE', 'partner', 4),
('Craft Silicon, Nairobi, Kenya', 'partner', 5),
('Geneva Global, USA', 'partner', 6),
('Partners in Development Services (PDS), Sudan', 'partner', 7),
('Koei Research & Consulting Inc., Tokyo, Japan', 'partner', 8),
('Foundation for Advanced Studies on International Development (FASID), Tokyo, Japan', 'partner', 9)
ON CONFLICT DO NOTHING; 