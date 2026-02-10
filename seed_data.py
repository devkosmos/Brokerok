import os
import json
from app import app, db
from models import City, District, Property

def seed_database():
    """Populate database with sample Turkish real estate data"""
    
    with app.app_context():
        # Clear existing data
        Property.query.delete()
        District.query.delete()
        City.query.delete()
        
        # Cities data
        cities_data = [
            {
                'name': 'Istanbul',
                'slug': 'istanbul',
                'description': 'The largest city in Turkey, spanning Europe and Asia',
                'latitude': 41.0082,
                'longitude': 28.9784,
                'image_url': 'https://images.unsplash.com/photo-1524356595002-596f36470b7f?w=500'
            },
            {
                'name': 'Ankara',
                'slug': 'ankara',
                'description': 'Capital of Turkey, located in Central Anatolia',
                'latitude': 39.9334,
                'longitude': 32.8597,
                'image_url': 'https://images.unsplash.com/photo-1570158268183-d296b2892211?w=500'
            },
            {
                'name': 'Izmir',
                'slug': 'izmir',
                'description': 'Coastal city on the Aegean Sea',
                'latitude': 38.4161,
                'longitude': 27.1228,
                'image_url': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'
            },
            {
                'name': 'Antalya',
                'slug': 'antalya',
                'description': 'Mediterranean resort city with beautiful beaches',
                'latitude': 36.8969,
                'longitude': 30.7133,
                'image_url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500'
            },
            {
                'name': 'Bursa',
                'slug': 'bursa',
                'description': 'Historic city known for silk production',
                'latitude': 40.1955,
                'longitude': 29.1763,
                'image_url': 'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=500'
            },
        ]
        
        cities = {}
        for city_data in cities_data:
            city = City(**city_data)
            db.session.add(city)
            cities[city_data['slug']] = city
        
        db.session.commit()
        
        # Districts data
        districts_data = {
            'istanbul': [
                {'name': 'Beyoglu', 'latitude': 41.0456, 'longitude': 28.9729},
                {'name': 'Fatih', 'latitude': 41.0192, 'longitude': 28.9629},
                {'name': 'Sisli', 'latitude': 41.0700, 'longitude': 28.9850},
                {'name': 'Besiktas', 'latitude': 41.0511, 'longitude': 29.0003},
                {'name': 'Kadikoy', 'latitude': 40.9883, 'longitude': 29.0287},
                {'name': 'Uskudar', 'latitude': 41.0164, 'longitude': 29.0176},
            ],
            'ankara': [
                {'name': 'Cankaya', 'latitude': 39.8282, 'longitude': 32.8662},
                {'name': 'Kecioren', 'latitude': 40.0545, 'longitude': 32.8662},
                {'name': 'Mamak', 'latitude': 39.9500, 'longitude': 32.6500},
            ],
            'izmir': [
                {'name': 'Alsancak', 'latitude': 38.4383, 'longitude': 27.1367},
                {'name': 'Bornova', 'latitude': 38.4500, 'longitude': 27.1833},
                {'name': 'Karsiyaka', 'latitude': 38.4500, 'longitude': 27.1000},
            ],
            'antalya': [
                {'name': 'Muratpasa', 'latitude': 36.8969, 'longitude': 30.7133},
                {'name': 'Kepez', 'latitude': 36.9500, 'longitude': 30.7500},
                {'name': 'Dosemealti', 'latitude': 36.7500, 'longitude': 30.6500},
            ],
            'bursa': [
                {'name': 'Osmangazi', 'latitude': 40.1955, 'longitude': 29.1763},
                {'name': 'Nilüfer', 'latitude': 40.2000, 'longitude': 29.2000},
                {'name': 'Yildirim', 'latitude': 40.1500, 'longitude': 29.1500},
            ],
        }
        
        districts = {}
        for city_slug, district_list in districts_data.items():
            city = cities[city_slug]
            for district_data in district_list:
                district = District(
                    city_id=city.id,
                    name=district_data['name'],
                    slug=district_data['name'].lower(),
                    latitude=district_data['latitude'],
                    longitude=district_data['longitude']
                )
                db.session.add(district)
                districts[f"{city_slug}_{district_data['name'].lower()}"] = district
        
        db.session.commit()
        
        # Properties data
        properties_data = [
            {
                'title': 'Luxury Apartment in Beyoglu',
                'description': 'Modern luxury apartment with sea view, 3 bedrooms, fully furnished',
                'property_type': 'apartment',
                'city_id': cities['istanbul'].id,
                'district_id': districts['istanbul_beyoglu'].id,
                'street_address': 'Istiklal Caddesi, No. 45',
                'price': 850000,
                'area': 180,
                'rooms': 3,
                'bathrooms': 2,
                'floor': 8,
                'total_floors': 15,
                'latitude': 41.0456,
                'longitude': 28.9729,
                'main_image': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
                'features': json.dumps({
                    'Air Conditioning': 'Yes',
                    'Parking': 'Yes',
                    'Balcony': 'Yes',
                    'Security': '24/7',
                    'Garden': 'No'
                })
            },
            {
                'title': 'Villa with Pool in Antalya',
                'description': 'Spacious villa with private pool, garden, and sea view',
                'property_type': 'villa',
                'city_id': cities['antalya'].id,
                'district_id': districts['antalya_muratpasa'].id,
                'street_address': 'Liman Caddesi, No. 12',
                'price': 1500000,
                'area': 450,
                'rooms': 5,
                'bathrooms': 3,
                'floor': 1,
                'total_floors': 2,
                'latitude': 36.8969,
                'longitude': 30.7133,
                'main_image': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
                'features': json.dumps({
                    'Pool': 'Yes',
                    'Garden': 'Yes',
                    'Garage': '2 cars',
                    'Security': 'Gated',
                    'Sauna': 'Yes'
                })
            },
            {
                'title': 'Cozy Apartment in Fatih',
                'description': 'Historic district apartment, close to mosques and bazaars',
                'property_type': 'apartment',
                'city_id': cities['istanbul'].id,
                'district_id': districts['istanbul_fatih'].id,
                'street_address': 'Mimar Sinan Caddesi, No. 78',
                'price': 450000,
                'area': 95,
                'rooms': 2,
                'bathrooms': 1,
                'floor': 4,
                'total_floors': 6,
                'latitude': 41.0192,
                'longitude': 28.9629,
                'main_image': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500',
                'features': json.dumps({
                    'Air Conditioning': 'Yes',
                    'Heating': 'Central',
                    'Balcony': 'Yes',
                    'Internet': 'Fiber',
                    'Furnished': 'Partially'
                })
            },
            {
                'title': 'Modern House in Ankara',
                'description': 'New construction house in quiet neighborhood',
                'property_type': 'house',
                'city_id': cities['ankara'].id,
                'district_id': districts['ankara_cankaya'].id,
                'street_address': 'Ataturk Bulvari, No. 234',
                'price': 650000,
                'area': 250,
                'rooms': 4,
                'bathrooms': 2,
                'floor': 1,
                'total_floors': 2,
                'latitude': 39.8282,
                'longitude': 32.8662,
                'main_image': 'https://images.unsplash.com/photo-1570129477492-45c003d96d3b?w=500',
                'features': json.dumps({
                    'Garden': 'Yes',
                    'Parking': 'Yes',
                    'Heating': 'Underfloor',
                    'Security': 'Alarm',
                    'Terrace': 'Yes'
                })
            },
            {
                'title': 'Beachfront Apartment in Izmir',
                'description': 'Stunning sea view apartment with direct beach access',
                'property_type': 'apartment',
                'city_id': cities['izmir'].id,
                'district_id': districts['izmir_alsancak'].id,
                'street_address': 'Alsancak Sahili, No. 156',
                'price': 750000,
                'area': 140,
                'rooms': 3,
                'bathrooms': 2,
                'floor': 10,
                'total_floors': 12,
                'latitude': 38.4383,
                'longitude': 27.1367,
                'main_image': 'https://images.unsplash.com/photo-1554995207-c18231b6ce48?w=500',
                'features': json.dumps({
                    'Sea View': 'Yes',
                    'Balcony': 'Large',
                    'Air Conditioning': 'Yes',
                    'Gym': 'Yes',
                    'Parking': 'Basement'
                })
            },
            {
                'title': 'Land Plot in Bursa',
                'description': 'Prime location land for development, close to city center',
                'property_type': 'land',
                'city_id': cities['bursa'].id,
                'district_id': districts['bursa_osmangazi'].id,
                'street_address': 'Cekirge Caddesi',
                'price': 200000,
                'area': 1500,
                'rooms': None,
                'bathrooms': None,
                'floor': None,
                'total_floors': None,
                'latitude': 40.1955,
                'longitude': 29.1763,
                'main_image': 'https://images.unsplash.com/photo-1500382017468-7049fae79424?w=500',
                'features': json.dumps({
                    'Zoning': 'Residential',
                    'Infrastructure': 'Available',
                    'Access': 'Main Road',
                    'Utilities': 'Connected'
                })
            },
            {
                'title': 'Luxury Penthouse in Sisli',
                'description': 'Top floor penthouse with panoramic city views',
                'property_type': 'apartment',
                'city_id': cities['istanbul'].id,
                'district_id': districts['istanbul_sisli'].id,
                'street_address': 'Nispetiye Caddesi, No. 89',
                'price': 2500000,
                'area': 350,
                'rooms': 4,
                'bathrooms': 3,
                'floor': 25,
                'total_floors': 25,
                'latitude': 41.0700,
                'longitude': 28.9850,
                'main_image': 'https://images.unsplash.com/photo-1512917774080-9b41b7b146fe?w=500',
                'features': json.dumps({
                    'City View': 'Panoramic',
                    'Terrace': 'Large',
                    'Smart Home': 'Yes',
                    'Concierge': 'Yes',
                    'Private Elevator': 'Yes'
                })
            },
            {
                'title': 'Family Villa in Kepez',
                'description': 'Spacious family villa with garden and guest house',
                'property_type': 'villa',
                'city_id': cities['antalya'].id,
                'district_id': districts['antalya_kepez'].id,
                'street_address': 'Konyaalti Caddesi, No. 45',
                'price': 1200000,
                'area': 380,
                'rooms': 4,
                'bathrooms': 3,
                'floor': 1,
                'total_floors': 2,
                'latitude': 36.9500,
                'longitude': 30.7500,
                'main_image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
                'features': json.dumps({
                    'Pool': 'Yes',
                    'Garden': 'Large',
                    'Guest House': 'Yes',
                    'Parking': '3 cars',
                    'Landscaping': 'Professional'
                })
            },
        ]
        
        for prop_data in properties_data:
            prop = Property(**prop_data)
            db.session.add(prop)
        
        db.session.commit()
        print("✅ Database seeded successfully with sample properties!")

if __name__ == '__main__':
    seed_database()
