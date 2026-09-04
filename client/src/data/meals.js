const meals = [
  // =========================
  // Cook 1 - Annapurna Home Kitchen
  // =========================
  {
    id: 1,
    cookId: 1,
    mealName: "North Indian Lunch Thali",
    description:
      "A wholesome homemade lunch with roti, dal, seasonal vegetable, rice, salad, and pickle.",
    category: "Lunch",
    cuisine: "North Indian",
    mealType: "Veg",
    mealPlan: "Daily",
    price: 120,
    image: "/images/meal-1.jpg",
    availability: true,
  },

  {
    id: 2,
    cookId: 1,
    mealName: "Special Homemade Dinner",
    description:
      "Fresh homemade dinner featuring traditional North Indian flavors and comforting sides.",
    category: "Dinner",
    cuisine: "North Indian",
    mealType: "Veg",
    mealPlan: "Weekly",
    price: 750,
    image: "/images/meal-2.jpg",
    availability: true,
  },

  // =========================
  // Cook 2 - Ghar Ka Swad
  // =========================
  {
    id: 3,
    cookId: 2,
    mealName: "Gujarati Kathiyawadi Thali",
    description:
      "Traditional Gujarati thali prepared fresh with authentic homemade flavors.",
    category: "Lunch",
    cuisine: "Gujarati",
    mealType: "Veg",
    mealPlan: "Daily",
    price: 130,
    image: "/images/meal-3.jpg",
    availability: true,
  },

  {
    id: 4,
    cookId: 2,
    mealName: "Gujarati Weekly Meal Plan",
    description:
      "A convenient weekly selection of fresh Gujarati homemade meals.",
    category: "Meal Plan",
    cuisine: "Gujarati",
    mealType: "Veg",
    mealPlan: "Weekly",
    price: 800,
    image: "/images/meal-4.jpg",
    availability: true,
  },

  // =========================
  // Cook 3 - Amma's Kitchen
  // =========================
  {
    id: 5,
    cookId: 3,
    mealName: "South Indian Lunch",
    description:
      "Fresh South Indian homemade meal with rice, sambar, vegetable, curd, and traditional sides.",
    category: "Lunch",
    cuisine: "South Indian",
    mealType: "Veg",
    mealPlan: "Daily",
    price: 110,
    image: "/images/meal-5.jpg",
    availability: true,
  },

  {
    id: 6,
    cookId: 3,
    mealName: "South Indian Monthly Plan",
    description:
      "Enjoy convenient homemade South Indian meals throughout the month.",
    category: "Meal Plan",
    cuisine: "South Indian",
    mealType: "Veg",
    mealPlan: "Monthly",
    price: 3000,
    image: "/images/meal-6.jpg",
    availability: true,
  },

  // =========================
  // Cook 4 - Maa's Punjabi Kitchen
  // =========================
  {
    id: 7,
    cookId: 4,
    mealName: "Punjabi Chicken Thali",
    description:
      "A hearty Punjabi homemade meal with chicken curry, roti, rice, salad, and pickle.",
    category: "Lunch",
    cuisine: "Punjabi",
    mealType: "Non-Veg",
    mealPlan: "Daily",
    price: 180,
    image: "/images/meal-7.jpg",
    availability: true,
  },

  {
    id: 8,
    cookId: 4,
    mealName: "Butter Chicken Dinner",
    description:
      "Creamy homemade butter chicken served with fresh naan, rice, and traditional sides.",
    category: "Dinner",
    cuisine: "Punjabi",
    mealType: "Non-Veg",
    mealPlan: "Weekly",
    price: 1100,
    image: "/images/meal-8.jpg",
    availability: true,
  },

  {
    id: 9,
    cookId: 4,
    mealName: "Punjabi Mutton Curry",
    description:
      "Slow-cooked mutton curry prepared with aromatic Punjabi spices and homemade flavors.",
    category: "Dinner",
    cuisine: "Punjabi",
    mealType: "Non-Veg",
    mealPlan: "Monthly",
    price: 3800,
    image: "/images/meal-9.jpg",
    availability: true,
  },

  // =========================
  // Cook 5 - Coastal Spice Kitchen
  // =========================
  {
    id: 10,
    cookId: 5,
    mealName: "Kerala Fish Curry Meal",
    description:
      "Traditional Kerala-style fish curry served with steamed rice, vegetable, and homemade sides.",
    category: "Lunch",
    cuisine: "Kerala",
    mealType: "Non-Veg",
    mealPlan: "Daily",
    price: 190,
    image: "/images/meal-10.jpg",
    availability: true,
  },

  {
    id: 11,
    cookId: 5,
    mealName: "Kerala Chicken Roast",
    description:
      "Tender chicken cooked with aromatic spices and traditional Kerala flavors.",
    category: "Dinner",
    cuisine: "Kerala",
    mealType: "Non-Veg",
    mealPlan: "Weekly",
    price: 1050,
    image: "/images/meal-11.jpg",
    availability: true,
  },

  {
    id: 12,
    cookId: 5,
    mealName: "Coastal Seafood Meal Plan",
    description:
      "A monthly selection of fresh coastal meals featuring fish, seafood, rice, and traditional sides.",
    category: "Meal Plan",
    cuisine: "Kerala",
    mealType: "Non-Veg",
    mealPlan: "Monthly",
    price: 4000,
    image: "/images/meal-12.jpg",
    availability: true,
  },

  // =========================
  // Cook 6 - Biryani Ghar
  // =========================
  {
    id: 13,
    cookId: 6,
    mealName: "Hyderabadi Chicken Biryani",
    description:
      "Aromatic homemade chicken biryani prepared with traditional Hyderabadi spices and basmati rice.",
    category: "Lunch",
    cuisine: "Hyderabadi",
    mealType: "Non-Veg",
    mealPlan: "Daily",
    price: 180,
    image: "/images/meal-13.jpg",
    availability: true,
  },

  {
    id: 14,
    cookId: 6,
    mealName: "Chicken 65 Dinner",
    description:
      "Crispy homemade Chicken 65 served with fragrant rice, salad, and refreshing raita.",
    category: "Dinner",
    cuisine: "Hyderabadi",
    mealType: "Non-Veg",
    mealPlan: "Weekly",
    price: 1000,
    image: "/images/meal-14.jpg",
    availability: true,
  },

  {
    id: 15,
    cookId: 6,
    mealName: "Hyderabadi Mutton Biryani Plan",
    description:
      "Rich and flavorful homemade mutton biryani prepared with traditional spices and long-grain rice.",
    category: "Meal Plan",
    cuisine: "Hyderabadi",
    mealType: "Non-Veg",
    mealPlan: "Monthly",
    price: 4200,
    image: "/images/meal-15.jpg",
    availability: true,
  },
];

export default meals;