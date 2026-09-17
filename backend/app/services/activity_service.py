"""
Activity Service — Mock Data
Activities across Indian destinations in Demo Mode.
"""

MOCK_ACTIVITIES = [
    # ── Delhi ──
    {"id": "AC001", "name": "India Gate & Rajpath Walk", "destination": "Delhi", "category": "sightseeing", "duration": "2 hours", "price": 0, "rating": 4.8, "review_count": 45000, "description": "Visit the iconic war memorial and take a stroll down the ceremonial boulevard.", "tags": ["Free", "Outdoor", "Historical", "Iconic"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC002", "name": "Red Fort Tour", "destination": "Delhi", "category": "culture", "duration": "2.5 hours", "price": 250, "rating": 4.5, "review_count": 32000, "description": "Explore the magnificent Mughal fortress, a UNESCO World Heritage Site.", "tags": ["Historical", "UNESCO", "Outdoor"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
    {"id": "AC003", "name": "Qutub Minar Complex", "destination": "Delhi", "category": "culture", "duration": "2 hours", "price": 300, "rating": 4.6, "review_count": 28000, "description": "See the 73m tall minaret, a masterpiece of Indo-Islamic architecture.", "tags": ["UNESCO", "Historical", "Photography"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
    {"id": "AC004", "name": "Chandni Chowk Food Walk", "destination": "Delhi", "category": "food", "duration": "3 hours", "price": 800, "rating": 4.9, "review_count": 15000, "description": "Guided culinary tour through Old Delhi's iconic market. Taste 10+ local specialties.", "tags": ["Food", "Culture", "Guided"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Foodies"},
    {"id": "AC005", "name": "Humayun's Tomb Visit", "destination": "Delhi", "category": "culture", "duration": "1.5 hours", "price": 250, "rating": 4.7, "review_count": 18000, "description": "Visit the stunning Mughal garden tomb that inspired the Taj Mahal.", "tags": ["UNESCO", "Gardens", "Historical"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Photography enthusiasts"},
    {"id": "AC006", "name": "Lodhi Garden Morning Walk", "destination": "Delhi", "category": "nature", "duration": "1.5 hours", "price": 0, "rating": 4.6, "review_count": 22000, "description": "Peaceful morning walk through medieval tombs set in manicured gardens.", "tags": ["Free", "Outdoor", "Nature", "Historical"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Early risers"},
    {"id": "AC007", "name": "Akshardham Temple", "destination": "Delhi", "category": "culture", "duration": "3 hours", "price": 170, "rating": 4.8, "review_count": 40000, "description": "Magnificent Hindu temple complex with exhibitions, musical fountain show.", "tags": ["Spiritual", "Architecture", "Show"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Families"},
    {"id": "AC008", "name": "Hauz Khas Village Exploration", "destination": "Delhi", "category": "entertainment", "duration": "3 hours", "price": 0, "rating": 4.4, "review_count": 12000, "description": "Explore art galleries, cafes, and boutiques around a medieval reservoir.", "tags": ["Trendy", "Shopping", "Art", "Cafes"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Young travelers"},

    # ── Goa ──
    {"id": "AC009", "name": "Baga Beach Watersports", "destination": "Goa", "category": "adventure", "duration": "3 hours", "price": 1500, "rating": 4.5, "review_count": 18000, "description": "Try parasailing, jet skiing, banana boat, and bumper rides at Baga Beach.", "tags": ["Adventure", "Beach", "Water Sports", "Thrilling"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Adventure seekers"},
    {"id": "AC010", "name": "Old Goa Churches Heritage Walk", "destination": "Goa", "category": "culture", "duration": "3 hours", "price": 0, "rating": 4.6, "review_count": 22000, "description": "Walk through UNESCO-listed Portuguese churches including Basilica of Bom Jesus.", "tags": ["Free", "UNESCO", "Historical", "Culture"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
    {"id": "AC011", "name": "Dudhsagar Waterfall Trek", "destination": "Goa", "category": "adventure", "duration": "8 hours", "price": 2500, "rating": 4.8, "review_count": 14000, "description": "Full-day jeep safari and trek to the magnificent 4-tiered waterfall.", "tags": ["Nature", "Adventure", "Scenic", "Trekking"], "time_of_day": "morning", "difficulty": "Hard", "best_for": "Nature lovers"},
    {"id": "AC012", "name": "Sunset Cruise on Mandovi River", "destination": "Goa", "category": "entertainment", "duration": "1.5 hours", "price": 600, "rating": 4.4, "review_count": 9800, "description": "Cruise along the Mandovi River with cultural performances and sunset views.", "tags": ["Scenic", "Cultural", "Romantic"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Couples"},
    {"id": "AC013", "name": "Spice Plantation Tour", "destination": "Goa", "category": "nature", "duration": "4 hours", "price": 1200, "rating": 4.5, "review_count": 7600, "description": "Visit a working spice plantation with guided tour and traditional Goan lunch.", "tags": ["Nature", "Food", "Guided", "Cultural"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Families"},
    {"id": "AC014", "name": "Scuba Diving at Grand Island", "destination": "Goa", "category": "adventure", "duration": "5 hours", "price": 3500, "rating": 4.7, "review_count": 8900, "description": "Certified scuba diving or beginner's dive at the crystal-clear Grand Island.", "tags": ["Adventure", "Underwater", "Marine Life", "Certification"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Adventure seekers"},
    {"id": "AC015", "name": "Goa Night Market (Ingo's)", "destination": "Goa", "category": "entertainment", "duration": "3 hours", "price": 0, "rating": 4.3, "review_count": 20000, "description": "Browse 100+ stalls of handicrafts, food, and music at the famous Saturday Night Market.", "tags": ["Free", "Shopping", "Food", "Music", "Night"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Shoppers"},

    # ── Mumbai ──
    {"id": "AC016", "name": "Gateway of India", "destination": "Mumbai", "category": "sightseeing", "duration": "1 hour", "price": 0, "rating": 4.5, "review_count": 65000, "description": "Visit India's iconic triumphal arch overlooking the Arabian Sea.", "tags": ["Free", "Iconic", "Historical", "Waterfront"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC017", "name": "Elephanta Caves Ferry Trip", "destination": "Mumbai", "category": "culture", "duration": "5 hours", "price": 800, "rating": 4.6, "review_count": 28000, "description": "Take a ferry to UNESCO-listed cave temples with magnificent Shiva sculptures.", "tags": ["UNESCO", "Ferry", "Historical", "Island"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "History lovers"},
    {"id": "AC018", "name": "Dharavi Slum Tour", "destination": "Mumbai", "category": "culture", "duration": "3 hours", "price": 700, "rating": 4.8, "review_count": 12000, "description": "Eye-opening guided walk through Asia's largest slum, a hub of small-scale industries.", "tags": ["Culture", "Guided", "Insightful", "Authentic"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Curious travelers"},
    {"id": "AC019", "name": "Marine Drive Sunset Walk", "destination": "Mumbai", "category": "sightseeing", "duration": "1.5 hours", "price": 0, "rating": 4.9, "review_count": 48000, "description": "Walk along the Queen's Necklace as the sun sets over the Arabian Sea.", "tags": ["Free", "Romantic", "Scenic", "Iconic"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
    {"id": "AC020", "name": "Bollywood Studio Tour", "destination": "Mumbai", "category": "entertainment", "duration": "4 hours", "price": 2000, "rating": 4.4, "review_count": 9500, "description": "Behind-the-scenes tour of Film City studios with live action and sets.", "tags": ["Entertainment", "Unique", "Indoor"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Film enthusiasts"},

    # ── Jaipur ──
    {"id": "AC021", "name": "Amber Fort & Elephant Ride", "destination": "Jaipur", "category": "culture", "duration": "4 hours", "price": 2500, "rating": 4.7, "review_count": 35000, "description": "Explore the magnificent hilltop Amber Fort and enjoy an elephant ride to the entrance.", "tags": ["UNESCO", "Heritage", "Elephant", "Panoramic View"], "time_of_day": "morning", "difficulty": "Moderate", "best_for": "Families"},
    {"id": "AC022", "name": "Hawa Mahal & City Palace", "destination": "Jaipur", "category": "culture", "duration": "3 hours", "price": 500, "rating": 4.6, "review_count": 42000, "description": "Visit the iconic Palace of Winds and the Royal City Palace complex.", "tags": ["Iconic", "Historical", "Royal", "Photography"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "Photography lovers"},
    {"id": "AC023", "name": "Jaipur Bazaar Shopping", "destination": "Jaipur", "category": "entertainment", "duration": "3 hours", "price": 0, "rating": 4.5, "review_count": 28000, "description": "Shop for gems, textiles, handicrafts, and blue pottery in the famous bazaars.", "tags": ["Shopping", "Handicrafts", "Bargaining"], "time_of_day": "afternoon", "difficulty": "Easy", "best_for": "Shoppers"},
    {"id": "AC024", "name": "Nahargarh Fort Sunset", "destination": "Jaipur", "category": "sightseeing", "duration": "2 hours", "price": 200, "rating": 4.8, "review_count": 18000, "description": "Watch the sunset from Nahargarh Fort with panoramic views of the Pink City.", "tags": ["Sunset", "Panoramic", "Romantic", "Photography"], "time_of_day": "evening", "difficulty": "Moderate", "best_for": "Couples & photographers"},

    # ── Lucknow ──
    {"id": "AC025", "name": "Bara Imambara Tour", "destination": "Lucknow", "category": "culture", "duration": "2 hours", "price": 250, "rating": 4.6, "review_count": 14000, "description": "Explore the magnificent 18th-century imambara with its famous Bhool Bhulaiya maze.", "tags": ["Historical", "Architecture", "Maze", "Nawabi Heritage"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
    {"id": "AC026", "name": "Lucknow Chaat & Kebab Tour", "destination": "Lucknow", "category": "food", "duration": "3 hours", "price": 600, "rating": 4.9, "review_count": 8900, "description": "Taste Lucknow's legendary galauti kebabs, basket chaat, and nimish.", "tags": ["Food", "Authentic", "Street Food", "Nawabi"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Foodies"},
    {"id": "AC027", "name": "Rumi Darwaza & British Residency", "destination": "Lucknow", "category": "culture", "duration": "2.5 hours", "price": 200, "rating": 4.5, "review_count": 11000, "description": "Visit the iconic gateway and the ruins of the British Residency from 1857.", "tags": ["Historical", "Architecture", "Photography"], "time_of_day": "morning", "difficulty": "Easy", "best_for": "History lovers"},
    {"id": "AC028", "name": "Hazratganj Evening Stroll", "destination": "Lucknow", "category": "entertainment", "duration": "2 hours", "price": 0, "rating": 4.3, "review_count": 20000, "description": "Stroll through Lucknow's most famous street, lined with shops, cafes, and culture.", "tags": ["Free", "Shopping", "Cafes", "Local Life"], "time_of_day": "evening", "difficulty": "Easy", "best_for": "Everyone"},
]


def search_activities(destination: str) -> list:
    """Search activities by destination."""
    dest_lower = destination.lower().strip()
    results = []
    for activity in MOCK_ACTIVITIES:
        if dest_lower in activity["destination"].lower() or activity["destination"].lower() in dest_lower:
            a = activity.copy()
            a["is_demo"] = True
            results.append(a)
    return results


def get_activity_by_id(activity_id: str):
    for activity in MOCK_ACTIVITIES:
        if activity["id"] == activity_id:
            return activity
    return None

