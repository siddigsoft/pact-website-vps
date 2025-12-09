#!/bin/bash

# Add Amara Okafor
sed -i '94i\    slug: "amara-okafor",' client/src/data/team.ts
sed -i '95i\    metaDescription: "Amara Okafor leads the Sustainable Business practice at PACT Consultancy, focusing on ESG strategy, sustainable operations, and social impact initiatives.",' client/src/data/team.ts

# Add Michael Taylor
sed -i '112i\    slug: "michael-taylor",' client/src/data/team.ts
sed -i '113i\    metaDescription: "Michael Taylor is a Senior Manager at PACT Consultancy specializing in public sector transformation, digital government initiatives, and policy implementation.",' client/src/data/team.ts

# Add Aisha Patel
sed -i '129i\    slug: "aisha-patel",' client/src/data/team.ts
sed -i '130i\    metaDescription: "Aisha Patel is a Senior Manager at PACT Consultancy specializing in customer experience transformation across retail, hospitality, and financial services.",' client/src/data/team.ts

# Add Carlos Mendoza
sed -i '146i\    slug: "carlos-mendoza",' client/src/data/team.ts
sed -i '147i\    metaDescription: "Carlos Mendoza is a Senior Manager at PACT Consultancy with expertise in supply chain optimization and operations excellence across manufacturing and retail.",' client/src/data/team.ts

chmod +x add_slugs.sh
