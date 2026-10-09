"""
Hotel Service — Mock Data
Realistic hotel data across Indian destinations in Demo Mode.
"""
from datetime import datetime


MOCK_HOTELS = [
    # ── Nainital (Nature & Lakes) ──
    {"id": "HT101", "name": "The Manu Maharani", "destination": "Nainital", "address": "Grassmere Estate, Mallital, Nainital", "rating": 5, "review_count": 2840, "price_per_night": 9500, "category": "Luxury", "amenities": ["Spa", "Valley View", "Restaurant", "WiFi", "Bar", "Gym", "Lawn", "Bonfire"], "description": "Premier luxury resort offering panoramic views of the shimmering Naini Lake.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Lake Facing Room", "Duplex Suite", "Club Suite"]},
    {"id": "HT102", "name": "The Naini Retreat by Leisure Hotels", "destination": "Nainital", "address": "Ayarpatta Slopes, Mallital, Nainital", "rating": 5, "review_count": 1950, "price_per_night": 8200, "category": "Heritage", "amenities": ["Heritage Architecture", "Spa", "Lawn", "Bar", "WiFi", "Heater", "Restaurant"], "description": "Historical residence of the Maharaja of Pilibhit, nestled among pine and oak forests.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Garden Room", "Lake Facing Royal", "Maharaja Suite"]},
    {"id": "HT103", "name": "Swiss Hotel Nainital", "destination": "Nainital", "address": "Mallital, Nainital", "rating": 4, "review_count": 1200, "price_per_night": 3800, "category": "Standard", "amenities": ["Garden", "Restaurant", "WiFi", "Parking", "Room Service"], "description": "Colonial-style wooden cottage hotel offering serene nature stays.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Standard Deluxe", "Family Suite"]},
    {"id": "HT104", "name": "Zostel Nainital", "destination": "Nainital", "address": "Pangot Road, Nainital", "rating": 4, "review_count": 3100, "price_per_night": 950, "category": "Budget", "amenities": ["WiFi", "Common Room", "Mountain Treks", "Cafe", "Lockers"], "description": "Cozy backpacker hostel with breathtaking Himalayan mountain vistas.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Mixed Dorm Bed", "Private Mountain Room"]},

    # ── Haridwar (Spiritual & Ghats) ──
    {"id": "HT105", "name": "Pilibhit House, Haridwar - IHCL SeleQtions", "destination": "Haridwar", "address": "Niranjani Akhara Marg, Sharvan Nath Nagar, Haridwar", "rating": 5, "review_count": 3400, "price_per_night": 14000, "category": "Luxury", "amenities": ["Private Ghat", "Ganga View", "Spa", "Pure Vegetarian Fine Dining", "WiFi", "Yoga & Meditation Deck"], "description": "Aristocratic heritage mansion on the banks of the sacred Ganges with direct private ghat access.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Ganga View Room", "Courtyard Suite", "Royal Ganga Suite"]},
    {"id": "HT106", "name": "Haveli Hari Ganga", "destination": "Haridwar", "address": "Pincode 249401, Bazar Ram Prasad, Haridwar", "rating": 4, "review_count": 2100, "price_per_night": 6500, "category": "Heritage", "amenities": ["Private Bathing Ghat", "Ayurvedic Massage", "Pure Veg Restaurant", "Ganga Aarti Assistance"], "description": "100-year-old heritage haveli with exquisite stone carvings and direct ghat bathing.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Heritage Deluxe", "Ganga View Suite"]},
    {"id": "HT107", "name": "Radisson Blu Hotel Haridwar", "destination": "Haridwar", "address": "Plot C1, Sector 12, SIDCUL, Haridwar", "rating": 4, "review_count": 2900, "price_per_night": 4800, "category": "Premium", "amenities": ["Pool", "Gym", "Spa", "Multiple Restaurants", "WiFi", "Bar"], "description": "Contemporary international luxury comfort with state-of-the-art facilities.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Superior", "Business Class", "Suite"]},
    {"id": "HT108", "name": "Hotel Ganga Lahari", "destination": "Haridwar", "address": "Gau Ghat, Haridwar", "rating": 3, "review_count": 1400, "price_per_night": 2200, "category": "Budget", "amenities": ["AC", "WiFi", "Vegetarian Food", "Near Har Ki Pauri"], "description": "Conveniently situated near holy Har Ki Pauri ghat with scenic river views.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard Room", "Deluxe Ganga View"]},

    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "HT109", "name": "The Royal Heritage Hotel & Resort Ayodhya", "destination": "Ayodhya", "address": "NH-28, Faizabad-Ayodhya Road, Ayodhya", "rating": 5, "review_count": 1800, "price_per_night": 8500, "category": "Heritage", "amenities": ["Royal Gardens", "Sattvik Restaurant", "Pool", "WiFi", "Travel Desk for Mandir Darshan", "Valet Parking"], "description": "Majestic palatial hotel celebrating the divine legacy and timeless traditions of Awadh.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Royal Deluxe", "Imperial Suite", "Ayodhya Palace Suite"]},
    {"id": "HT110", "name": "Park Inn by Radisson Ayodhya", "destination": "Ayodhya", "address": "Civil Lines, Near Ram Janmabhoomi, Ayodhya", "rating": 4, "review_count": 2200, "price_per_night": 5600, "category": "Premium", "amenities": ["Rooftop Cafe", "Gym", "WiFi", "Pure Veg Multi-cuisine", "Concierge"], "description": "Modern upscale hotel strategically located close to Ram Mandir and sacred ghats.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Superior Room", "Deluxe Mandir View"]},
    {"id": "HT111", "name": "Ramayana Hotel Ayodhya", "destination": "Ayodhya", "address": "Booth No 4, Manjha Kala, Ayodhya", "rating": 4, "review_count": 1650, "price_per_night": 3800, "category": "Standard", "amenities": ["AC", "Restaurant", "WiFi", "Temple Shuttle", "Room Service"], "description": "Warm spiritual ambience with traditional hospitality and sattvik dining.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Deluxe Room", "Family Suite"]},
    {"id": "HT112", "name": "Shree Ram Kripa Yatri Niwas", "destination": "Ayodhya", "address": "Hanuman Garhi Road, Ayodhya", "rating": 3, "review_count": 980, "price_per_night": 1400, "category": "Budget", "amenities": ["Clean Beds", "Hot Water", "WiFi", "Walking Distance to Temple"], "description": "Affordable and peaceful pilgrim accommodation at the holy center.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard Double", "Triple Bed Room"]},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "HT113", "name": "Mayfair Lake Resort Raipur", "destination": "Raipur", "address": "Jhangh Lake, Sector 24, Nava Raipur", "rating": 5, "review_count": 2700, "price_per_night": 11500, "category": "Luxury", "amenities": ["Lake View", "Infinity Pool", "Spa", "Multi-cuisine", "Tribal Art Gallery", "Boating"], "description": "Ultra-luxury lakefront resort showcasing the indigenous tribal architecture of Chhattisgarh.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Executive Lake View", "Cottage", "Presidential Villa"]},
    {"id": "HT114", "name": "Courtyard by Marriott Raipur", "destination": "Raipur", "address": "NH-6, Labhandi, Raipur", "rating": 5, "review_count": 3100, "price_per_night": 6200, "category": "Premium", "amenities": ["Pool", "Gym", "Spa", "Restaurant", "Bar", "WiFi", "Business Center"], "description": "World-class business and leisure hotel on the main highway corridor.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Deluxe", "Executive", "Suite"]},
    {"id": "HT115", "name": "Zone by The Park Raipur", "destination": "Raipur", "address": "VIP Road, Raipur", "rating": 4, "review_count": 1500, "price_per_night": 3400, "category": "Standard", "amenities": ["WiFi", "Restaurant", "Gym", "Bar", "Trendy Lounge"], "description": "Social, vibrant hotel with contemporary design and great connectivity.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Zone Room", "Zone Trio"]},

    # ── Jammu & Kashmir (Srinagar / Jammu / Gulmarg) ──
    {"id": "HT116", "name": "The Lalit Grand Palace Srinagar", "destination": "Jammu and Kashmir", "address": "Gupkar Road, Srinagar, Kashmir", "rating": 5, "review_count": 3900, "price_per_night": 18000, "category": "Luxury", "amenities": ["Palace Architecture", "Dal Lake View", "Indoor Heated Pool", "Spa", "Mughal Gardens", "Fine Dining"], "description": "Former royal palace of the Maharaja of Jammu & Kashmir overlooking scenic Dal Lake.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Palace Room", "Heritage Suite", "Maharaja Presidential Suite"]},
    {"id": "HT117", "name": "Sukoon Luxury Heritage Houseboat", "destination": "Jammu and Kashmir", "address": "Ghat 21, Dal Lake, Srinagar", "rating": 5, "review_count": 1450, "price_per_night": 12000, "category": "Heritage", "amenities": ["Hand-Carved Cedar Wood", "Rooftop Sundeck", "Shikara Transfers", "Traditional Wazwan Cuisine", "WiFi"], "description": "Exquisite eco-friendly luxury houseboat with unobstructed views of the Zabarwan range.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Kashmir Suite", "Mughal Suite"]},
    {"id": "HT118", "name": "Radisson Blu Jammu", "destination": "Jammu and Kashmir", "address": "Radisson Square, Narwal Bypass, Jammu", "rating": 4, "review_count": 2100, "price_per_night": 4900, "category": "Premium", "amenities": ["Pool", "Spa", "Gym", "Restaurant", "Bar", "WiFi"], "description": "Upscale contemporary hotel at the gateway to the sacred Vaishno Devi shrine.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Superior Room", "Deluxe Suite"]},
    {"id": "HT119", "name": "Zostel Srinagar", "destination": "Jammu and Kashmir", "address": "Nishat, Near Mughal Gardens, Srinagar", "rating": 4, "review_count": 4200, "price_per_night": 850, "category": "Budget", "amenities": ["WiFi", "Common Garden", "Tours & Treks", "Traditional Bukhari Heaters"], "description": "Backpacker haven located a short stroll from Nishat Bagh and Dal Lake.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Mixed Dorm Bed", "Private Deluxe Room"]},

    # ── Varanasi (Kashi Ghats & Spiritual Heritage) ──
    {"id": "HT120", "name": "BrijRama Palace, Varanasi", "destination": "Varanasi", "address": "Darbhanga Ghat, Dashashwamedh, Varanasi", "rating": 5, "review_count": 4800, "price_per_night": 19000, "category": "Luxury", "amenities": ["Direct Ghat Location", "Private Boat Transfers", "Live Classical Music", "Vegetarian Fine Dining", "Heritage Architecture", "Spa"], "description": "Historic 210-year-old palace on the banks of holy river Ganga, reachable exclusively by royal boat.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Nadidhara Room", "Dhanurdhara Room", "Maharaja Suite"]},
    {"id": "HT121", "name": "Taj Ganges Varanasi", "destination": "Varanasi", "address": "Nadesar Palace Grounds, Varanasi", "rating": 5, "review_count": 3200, "price_per_night": 9500, "category": "Luxury", "amenities": ["12 Acres Lush Lawns", "Pool", "Spa", "Gym", "Multi-cuisine", "WiFi"], "description": "Serene resort oasis in the sacred city offering majestic luxury and hospitality.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe Garden View", "Executive Suite"]},
    {"id": "HT122", "name": "Ganpati Guest House", "destination": "Varanasi", "address": "Meer Ghat, Varanasi", "rating": 4, "review_count": 2700, "price_per_night": 2400, "category": "Standard", "amenities": ["Riverfront Terrace Cafe", "WiFi", "Colorful Courtyard", "Boat Tours"], "description": "Charming family-run guesthouse with direct panoramic Ganga views.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard Room", "River View Balcony Room"]},
    {"id": "HT123", "name": "Zostel Varanasi", "destination": "Varanasi", "address": "Dashashwamedh Road, Varanasi", "rating": 4, "review_count": 5100, "price_per_night": 650, "category": "Budget", "amenities": ["WiFi", "Rooftop Hangout", "Walking Tours", "Lockers"], "description": "Vibrant and social hostel walking distance to the evening Ganga Aarti.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Dorm Bed", "Private Room"]},

    # ── Karnataka (Mysore, Coorg, Hampi, Bangalore) ──
    {"id": "HT124", "name": "Evolve Back, Chikkana Halli Estate, Coorg", "destination": "Karnataka", "address": "Karadigodu Post, Siddapur, Coorg, Karnataka", "rating": 5, "review_count": 3600, "price_per_night": 24000, "category": "Luxury", "amenities": ["Private Pool Villas", "Coffee Plantation", "Ayurvedic Spa", "Multiple Fine Dining", "Infinity Pool", "Nature Walks"], "description": "Iconic luxury plantation resort set amidst 300 acres of aromatic coffee and spice plantations.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Heritage Pool Villa", "Lily Pool Cottage", "Plantation Suite"]},
    {"id": "HT125", "name": "Royal Orchid Metropole Mysore", "destination": "Karnataka", "address": "5 Jhansi Rani Lakshmi Bai Road, Mysore, Karnataka", "rating": 4, "review_count": 2100, "price_per_night": 5200, "category": "Heritage", "amenities": ["Heritage Courtyard", "Pool", "Restaurant", "WiFi", "Bar", "Near Mysore Palace"], "description": "Originally built by the Maharaja of Mysore for royal guests, featuring grand imperial architecture.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Royal Wing Room", "Maharaja Suite"]},
    {"id": "HT126", "name": "Heritage Resort Hampi", "destination": "Karnataka", "address": "Hospet Road, Hampi, Karnataka", "rating": 4, "review_count": 1800, "price_per_night": 4600, "category": "Standard", "amenities": ["Pool", "Organic Farm", "Spa", "WiFi", "UNESCO Ruins Tours"], "description": "Eco-friendly tranquil retreat located minutes away from the UNESCO World Heritage monuments of Vijayanagara.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Deluxe Cottage", "Pool Villa"]},

    # ── Standard Base Cities ──
    {"id": "HT001", "name": "The Leela Palace New Delhi", "destination": "Delhi", "address": "Diplomatic Enclave, Chanakyapuri, New Delhi", "rating": 5, "review_count": 3240, "price_per_night": 12000, "category": "Luxury", "amenities": ["Pool", "Gym", "Spa", "Restaurant", "Bar", "WiFi", "Parking", "Room Service"], "description": "Iconic 5-star palace hotel offering regal splendor in the heart of Delhi.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Suite"]},
    {"id": "HT006", "name": "W Goa", "destination": "Goa", "address": "Vagator Beach, North Goa", "rating": 5, "review_count": 2890, "price_per_night": 15000, "category": "Luxury", "amenities": ["Infinity Pool", "Spa", "Beach Access", "Gym"], "description": "Stunning beachfront luxury resort with spectacular Arabian Sea views.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Wonderful Room", "Fabulous Suite"]},
    {"id": "HT011", "name": "The Oberoi Mumbai", "destination": "Mumbai", "address": "Nariman Point, Mumbai", "rating": 5, "review_count": 2650, "price_per_night": 16000, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Multiple Restaurants", "Sea View"], "description": "Magnificent hotel overlooking the Arabian Sea with legendary hospitality.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Luxury Suite"]},
    {"id": "HT018", "name": "Taj Mahal Lucknow", "destination": "Lucknow", "address": "Vipin Khand, Gomti Nagar, Lucknow", "rating": 5, "review_count": 1890, "price_per_night": 8500, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Restaurant", "WiFi"], "description": "Luxury hotel in Gomti Nagar offering world-class amenities.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Suite"]},
]


def search_hotels(destination: str, checkin: str, checkout: str, guests: int) -> list:
    """Search hotels by destination and calculate total price."""
    dest_lower = destination.lower().strip() if destination else ""

    # Calculate nights
    nights = 1
    if checkin and checkout:
        try:
            d1 = datetime.strptime(checkin, "%Y-%m-%d")
            d2 = datetime.strptime(checkout, "%Y-%m-%d")
            nights = max(1, (d2 - d1).days)
        except Exception:
            nights = 1

    results = []
    for h in MOCK_HOTELS:
        if dest_lower in h["destination"].lower() or h["destination"].lower() in dest_lower:
            hotel = dict(h)
            hotel["nights"] = nights
            hotel["total_price"] = hotel["price_per_night"] * nights
            hotel["guests"] = guests
            hotel["is_demo"] = True
            results.append(hotel)

    if not results and destination:
        base_rate = 3500
        results.append({
            "id": "HT-FALLBACK",
            "name": f"Grand {destination.title()} Heritage Inn",
            "destination": destination,
            "address": f"Central Road, {destination.title()}",
            "rating": 4,
            "review_count": 850,
            "price_per_night": base_rate,
            "nights": nights,
            "total_price": base_rate * nights,
            "category": "Standard",
            "amenities": ["WiFi", "AC", "Restaurant", "Room Service", "Parking"],
            "description": f"Comfortable hotel located centrally in {destination.title()}.",
            "cancellation": "Free cancellation before 24h",
            "breakfast": True,
            "room_types": ["Deluxe Room", "Executive Suite"],
            "guests": guests,
            "is_demo": True,
        })
    return results


def get_hotel_by_id(hotel_id: str):
    for h in MOCK_HOTELS:
        if h["id"] == hotel_id:
            return h
    return None
