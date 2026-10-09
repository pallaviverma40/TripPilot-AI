"""
Activity Service — Mock Data
Activities across Indian destinations in Demo Mode.
"""

MOCK_ACTIVITIES = [
    # ── Nainital (Nature & Lakes) ──
    {"id": "AC101", "name": "Naini Lake Boating & Yacht Ride", "destination": "Nainital", "category": "nature", "duration": "1.5 hours", "price": 400, "rating": 4.9, "review_count": 32000, "description": "Glide along the emerald waters of Naini Lake in a traditional paddle boat or romantic yacht.", "tags": ["Boating", "Lake", "Scenic", "Romantic"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Couples & Families"},
    {"id": "AC102", "name": "Snow View Point Aerial Ropeway", "destination": "Nainital", "category": "adventure", "duration": "2 hours", "price": 350, "rating": 4.7, "review_count": 21000, "description": "Cable car ride up to 2,270m offering breathtaking panoramic vistas of Trishul and Nanda Devi peaks.", "tags": ["Cable Car", "Himalayas", "Panoramic Views"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Photography enthusiasts"},
    {"id": "AC103", "name": "Tiffin Top (Dorothy's Seat) Trek", "destination": "Nainital", "category": "adventure", "duration": "3 hours", "price": 0, "rating": 4.8, "review_count": 14000, "description": "Scenic hilltop trek amidst oak and deodar forests with 360-degree views of the Kumaon valley.", "tags": ["Free", "Trek", "Nature", "Himalayan Vistas"], "time_of_day": "afternoon", "difficulty": "Moderate", "best_for": "Nature lovers"},
    {"id": "AC104", "name": "Naina Devi Temple & Mall Road Evening Walk", "destination": "Nainital", "category": "culture", "duration": "2.5 hours", "price": 0, "rating": 4.6, "review_count": 25000, "description": "Visit the sacred 51 Shakti Peeth temple by the lake followed by shopping for handmade scented candles.", "tags": ["Free", "Spiritual", "Shopping", "Lakeside"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},

    # ── Haridwar (Spiritual & Ghats) ──
    {"id": "AC105", "name": "Sacred Ganga Aarti at Har Ki Pauri", "destination": "Haridwar", "category": "culture", "duration": "2 hours", "price": 0, "rating": 5.0, "review_count": 89000, "description": "Witness the divine spectacle of floating diya lamps, ringing temple bells, and chanting at the holiest ghat.", "tags": ["Free", "Spiritual", "Iconic", "Divine Experience"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC106", "name": "Mansa Devi & Chandi Devi Cable Car Pilgrimage", "destination": "Haridwar", "category": "culture", "duration": "3.5 hours", "price": 380, "rating": 4.7, "review_count": 28000, "description": "Ropeway ride to the sacred hilltop shrines overlooking the holy city and Shivalik mountain ranges.", "tags": ["Spiritual", "Cable Car", "Hilltop Shrine"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Pilgrims & Families"},
    {"id": "AC107", "name": "Moti Bazaar Street Food & Sweets Trail", "destination": "Haridwar", "category": "food", "duration": "2 hours", "price": 450, "rating": 4.8, "review_count": 18000, "description": "Relish famous hot kachoris with aloo sabzi, rabri jalebi, and refreshing kulhad lassi.", "tags": ["Street Food", "Vegetarian", "Traditional"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Foodies"},
    {"id": "AC108", "name": "Rajaji National Park Jungle Safari", "destination": "Haridwar", "category": "adventure", "duration": "4 hours", "price": 2200, "rating": 4.6, "review_count": 9200, "description": "4x4 open jeep safari to spot wild Asian elephants, leopards, and over 300 species of migratory birds.", "tags": ["Wildlife", "Safari", "Nature", "Elephants"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Wildlife lovers"},

    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "AC109", "name": "Ram Janmabhoomi & Mandir Complex Darshan", "destination": "Ayodhya", "category": "culture", "duration": "3 hours", "price": 0, "rating": 5.0, "review_count": 95000, "description": "Darshan at the grand Nagara-style Ram Mandir, featuring pink sandstone architecture and ornate carvings.", "tags": ["Free", "Spiritual", "Heritage", "Iconic"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Pilgrims & Heritage lovers"},
    {"id": "AC110", "name": "Saryu River Sunset Boat Ride & Maha Aarti", "destination": "Ayodhya", "category": "culture", "duration": "2 hours", "price": 300, "rating": 4.9, "review_count": 34000, "description": "Peaceful cruise on the sacred Saryu river accompanied by glowing evening oil lamps and grand river aarti.", "tags": ["Boating", "River Aarti", "Spiritual", "Sunset"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC111", "name": "Hanuman Garhi & Kanak Bhawan Heritage Walk", "destination": "Ayodhya", "category": "culture", "duration": "2.5 hours", "price": 0, "rating": 4.8, "review_count": 41000, "description": "Climb the 76 steps of the 10th-century fort-temple of Lord Hanuman and visit the ornate palace of Sita.", "tags": ["Free", "Heritage Walk", "Ancient Fort", "Spiritual"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Culture lovers"},
    {"id": "AC112", "name": "Traditional Awadhi Sattvik Culinary Trail", "destination": "Ayodhya", "category": "food", "duration": "2 hours", "price": 400, "rating": 4.7, "review_count": 12000, "description": "Taste local delicacies including Ramdana laddoos, khurchan peda, and authentic ghee-cooked poori sabzi.", "tags": ["Food", "Sattvik", "Traditional Sweets"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Foodies"},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "AC113", "name": "Bastar Tribal Art & Bell Metal Craft Tour", "destination": "Raipur", "category": "culture", "duration": "3.5 hours", "price": 600, "rating": 4.8, "review_count": 8700, "description": "Live demonstration of 4000-year-old Dhokra lost-wax bronze metal casting by indigenous master artisans.", "tags": ["Tribal Art", "Dhokra Craft", "Culture", "Workshops"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Art & Culture lovers"},
    {"id": "AC114", "name": "Chitrakote Falls Day Excursion", "destination": "Raipur", "category": "nature", "duration": "8 hours", "price": 1800, "rating": 4.9, "review_count": 16000, "description": "Visit the majestic 300-meter-wide horseshoe waterfall on Indravati river, known as India's Niagara.", "tags": ["Waterfalls", "Nature", "Scenic Day Trip"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Nature enthusiasts"},
    {"id": "AC115", "name": "Barnawapara Wildlife Sanctuary Safari", "destination": "Raipur", "category": "adventure", "duration": "5 hours", "price": 1500, "rating": 4.6, "review_count": 7200, "description": "Explore dense sal and teak forests home to Indian bison (Gaur), sloth bears, and flying squirrels.", "tags": ["Safari", "Wildlife", "Jungle"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Wildlife lovers"},

    # ── Jammu and Kashmir (Srinagar / Gulmarg / Pahalgam) ──
    {"id": "AC116", "name": "Dal Lake Sunset Shikara & Floating Market", "destination": "Jammu and Kashmir", "category": "nature", "duration": "2 hours", "price": 750, "rating": 5.0, "review_count": 76000, "description": "Relax on a cushioned Kashmiri wooden boat gliding past floating gardens and lotus flower blooms.", "tags": ["Shikara", "Dal Lake", "Romantic", "Iconic"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Couples & Families"},
    {"id": "AC117", "name": "Gulmarg Gondola Snow Cable Car", "destination": "Jammu and Kashmir", "category": "adventure", "duration": "4 hours", "price": 1650, "rating": 4.9, "review_count": 48000, "description": "World's second highest operating cable car reaching Apharwat Peak (3,980m) for skiing and snow views.", "tags": ["Snow", "Gondola", "Himalayas", "Adventure"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Adventure seekers"},
    {"id": "AC118", "name": "Mughal Gardens (Nishat & Shalimar) Tour", "destination": "Jammu and Kashmir", "category": "culture", "duration": "3 hours", "price": 100, "rating": 4.7, "review_count": 39000, "description": "Stroll through terraced water gardens built by Emperor Jahangir lined with majestic chinar trees.", "tags": ["Gardens", "Mughal Heritage", "Photography"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Families & Photographers"},
    {"id": "AC119", "name": "Traditional Kashmiri Wazwan Feast", "destination": "Jammu and Kashmir", "category": "food", "duration": "2 hours", "price": 1200, "rating": 4.9, "review_count": 21000, "description": "Indulge in a 36-course royal multi-course culinary heritage meal including Rogan Josh and Gushtaba.", "tags": ["Food", "Royal Wazwan", "Authentic Cuisine"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Foodies"},

    # ── Varanasi (Kashi Culture & Ghats) ──
    {"id": "AC120", "name": "Subah-e-Banaras Sunrise Boat Ride", "destination": "Varanasi", "category": "culture", "duration": "2.5 hours", "price": 500, "rating": 5.0, "review_count": 92000, "description": "Row across the morning mist on holy river Ganga watching morning prayers, rituals, and sacred chants.", "tags": ["Sunrise", "Boat Ride", "Ghats", "Spiritual"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC121", "name": "Grand Evening Ganga Aarti at Dashashwamedh", "destination": "Varanasi", "category": "culture", "duration": "2 hours", "price": 0, "rating": 5.0, "review_count": 110000, "description": "Witness the world-renowned ritual performed by young Vedic priests with multi-tiered brass oil lamps.", "tags": ["Free", "Aarti", "Divine", "Iconic"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC122", "name": "Kashi Vishwanath Corridor & Temple Darshan", "destination": "Varanasi", "category": "culture", "duration": "2 hours", "price": 0, "rating": 4.9, "review_count": 78000, "description": "Visit one of the 12 Jyotirlingas, newly interconnected with the sacred river ghats.", "tags": ["Free", "Jyotirlinga", "Spiritual"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Pilgrims"},
    {"id": "AC123", "name": "Banarasi Silk Weaving Village Masterclass", "destination": "Varanasi", "category": "culture", "duration": "3 hours", "price": 450, "rating": 4.8, "review_count": 16000, "description": "Meet generational weavers and learn how pure gold and silver zari threads are woven into sarees.", "tags": ["Handloom", "Silk", "Workshops", "Artisans"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Art lovers"},

    # ── Karnataka (Mysore, Coorg, Hampi) ──
    {"id": "AC124", "name": "Mysore Palace Illuminated Night Tour", "destination": "Karnataka", "category": "culture", "duration": "2.5 hours", "price": 200, "rating": 4.9, "review_count": 65000, "description": "Witness the magical illumination of the Indo-Saracenic royal palace with nearly 100,000 glowing bulbs.", "tags": ["Royal Palace", "Illumination", "Architecture"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC125", "name": "Hampi UNESCO Ruins Heritage Walk", "destination": "Karnataka", "category": "culture", "duration": "4.5 hours", "price": 350, "rating": 4.9, "review_count": 48000, "description": "Explore the stone chariot at Vijaya Vittala Temple and the grand monuments of the 14th-century Vijayanagara empire.", "tags": ["UNESCO", "Ancient Ruins", "Stone Chariot", "History"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "History lovers"},
    {"id": "AC126", "name": "Coorg Coffee & Spice Plantation Walk", "destination": "Karnataka", "category": "nature", "duration": "3 hours", "price": 600, "rating": 4.8, "review_count": 29000, "description": "Guided walking tour through lush Arabica coffee estates with fresh coffee bean roasting and tasting.", "tags": ["Coffee", "Plantation", "Nature", "Tasting"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Nature lovers"},

    # ── Standard Base Cities (Delhi, Goa, Mumbai, Jaipur, Lucknow) ──
    {"id": "AC001", "name": "India Gate & Rajpath Walk", "destination": "Delhi", "category": "sightseeing", "duration": "2 hours", "price": 0, "rating": 4.8, "review_count": 45000, "description": "Visit the iconic war memorial boulevard.", "tags": ["Free", "Historical"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC009", "name": "Baga Beach Watersports", "destination": "Goa", "category": "adventure", "duration": "3 hours", "price": 1500, "rating": 4.5, "review_count": 18000, "description": "Parasailing, jet skiing, and banana rides.", "tags": ["Water Sports", "Beach"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Adventure seekers"},
    {"id": "AC016", "name": "Gateway of India", "destination": "Mumbai", "category": "sightseeing", "duration": "1 hour", "price": 0, "rating": 4.5, "review_count": 65000, "description": "Iconic arch overlooking the Arabian Sea.", "tags": ["Free", "Waterfront"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC021", "name": "Amber Fort Tour", "destination": "Jaipur", "category": "culture", "duration": "4 hours", "price": 2500, "rating": 4.7, "review_count": 35000, "description": "Hilltop palace fort with elephant rides and royal courtyards.", "tags": ["UNESCO", "Royal"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Families"},
    {"id": "AC025", "name": "Bara Imambara & Bhool Bhulaiya", "destination": "Lucknow", "category": "culture", "duration": "2 hours", "price": 250, "rating": 4.6, "review_count": 14000, "description": "Historic maze and grand nawabi architecture.", "tags": ["Nawabi", "Architecture"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
]


def search_activities(destination: str) -> list:
    """Search activities by destination."""
    dest_lower = destination.lower().strip() if destination else ""
    results = []
    for activity in MOCK_ACTIVITIES:
        if dest_lower in activity["destination"].lower() or activity["destination"].lower() in dest_lower:
            a = activity.copy()
            a["is_demo"] = True
            results.append(a)

    if not results and destination:
        results.append({
            "id": "AC-FALLBACK",
            "name": f"Explore {destination.title()} Heritage & Culture Trail",
            "destination": destination,
            "category": "culture",
            "duration": "2.5 hours",
            "price": 300,
            "rating": 4.7,
            "review_count": 1200,
            "description": f"Guided cultural walking trail exploring the landmarks and local gems of {destination.title()}.",
            "tags": ["Culture", "Sightseeing", "Guided Walk"],
            "time_of_day": "morning",
            "difficulty": "Easy",
            "best_for": "Everyone",
            "is_demo": True
        })
    return results


def get_activity_by_id(activity_id: str):
    for activity in MOCK_ACTIVITIES:
        if activity["id"] == activity_id:
            return activity
    return None
