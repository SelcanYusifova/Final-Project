import Bedspreads from "../user/pages/bedroom/bedspreads";
import Quilts from "../user/pages/bedroom/quilts";
import Bedding from "../user/pages/bedroom/bedding";
import Duvetcovers from "../user/pages/bedroom/duvetcovers";
import SeeAll from "../user/pages/bedroom/seeAll";
import Cushionsandthrows from "../user/pages/bedroom/cushionsandthrows";
import Wardrobesandstorage from "../user/pages/bedroom/wardrobesandstorage";


import Blanketsandthrows from "../user/pages/homedecor/blanketsandthrows";
import Curtainsandrollerblinds from "../user/pages/homedecor/curtainsandrollerblinds";
import Vases from "../user/pages/homedecor/vases";
import Decorativeaccessories from "../user/pages/homedecor/decorativeaccessories";
import Candleholders from "../user/pages/homedecor/candleholders";
import Doorknobsandhooks from "../user/pages/homedecor/doorknobsandhooks";
import Cushions from "../user/pages/homedecor/cushions";



import Cleaning from "../user/pages/kitchenanddining/cleaning";
import Kitchenaccessories from "../user/pages/kitchenanddining/kitchenaccessories";
import Tableaccessories from "../user/pages/kitchenanddining/tableaccessories";
import Tablecloths from "../user/pages/kitchenanddining/tablecloths";
import Kitchentextiles from "../user/pages/kitchenanddining/kitchentextiles";
import Storage from "../user/pages/kitchenanddining/storage";
import Recipes from "../user/pages/kitchenanddining/recipes";


import Baskets from "../user/pages/bathroom/baskets";
import Bathmats from "../user/pages/bathroom/bathmats";
import Towels from "../user/pages/bathroom/towels";
import Everydaytowels from "../user/pages/bathroom/everydaytowels";
import Selfcare from "../user/pages/bathroom/selfcare";
import Showercurtains from "../user/pages/bathroom/showercurtains";
import Bathroomaccessories from "../user/pages/bathroom/bathroomaccessories";
import Toiletrybags from "../user/pages/bathroom/toiletrybags";


import Baby from "../user/pages/kidsandbaby/baby";
import Babybedding from "../user/pages/kidsandbaby/bedding";
import Decoration from "../user/pages/kidsandbaby/decoration";
import Basketsandstorage from "../user/pages/kidsandbaby/basketsandstorage";
import Bathroom from "../user/pages/kidsandbaby/bathroom";

import Seealllaundry from "../user/pages/laundrycare/seeall";
import Laundrycare from "../user/pages/laundrycare/laundrycare";
import Cleaninglaundry from "../user/pages/laundrycare/cleaning";
import Basketsandstoragelaundry from "../user/pages/laundrycare/basketsandstorage";






export const subcategoryComponentsMap = {
  bedroom: {
    "see-all": SeeAll,
    "bedding": Bedding,
    "duvet-covers": Duvetcovers,
    "quilts": Quilts,
    "bedspreads": Bedspreads,
    "cushions-and-throws": Cushionsandthrows,
    "wardrobes-and-storage": Wardrobesandstorage,
  },
  "home-decor": {
    "blankets-and-throws": Blanketsandthrows,
    "cushions": Cushions,
    "curtains-and-roller-blinds": Curtainsandrollerblinds,
    "vases": Vases,
    "decorative-accessories": Decorativeaccessories,
    "candle-holders": Candleholders,
    "door-knobs-and-hooks": Doorknobsandhooks,
  },
  "kitchen-and-dining": {
    "tablecloths": Tablecloths,
    "table-accessories": Tableaccessories,
    "kitchen-accessories": Kitchenaccessories,
    "kitchen-textiles": Kitchentextiles,
    "cleaning": Cleaning,
    "storage": Storage,
    "recipes": Recipes,
  },
  bathroom: {
    "towels": Towels,
    "everyday-towels": Everydaytowels,
    "bath-mats": Bathmats,
    "shower-curtains": Showercurtains,
    "bathroom-accessories": Bathroomaccessories,
    "baskets": Baskets,
    "toiletry-bags": Toiletrybags,
    "self-care": Selfcare,
  },
  "kids-and-baby": {
    "baby": Baby,
    "bedding": Babybedding,
    "decoration": Decoration,
    "baskets-and-storage":  Basketsandstorage,
    "bathroom": Bathroom,
  },
  "laundry-care": {
    "see-all": Seealllaundry,
    "laundry-care": Laundrycare,
    "cleaning": Cleaninglaundry,
    "baskets-and-storage":  Basketsandstoragelaundry,
  }
};
