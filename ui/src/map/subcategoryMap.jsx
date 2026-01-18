import Bedspreads from "../user/pages/bedroom/bedspreads";
import Quilts from "../user/pages/bedroom/quilts";
import Bedding from "../user/pages/bedroom/bedding";
import Duvetcovers from "../user/pages/bedroom/duvetcovers";
import SeeAll from "../user/pages/bedroom/seeAll";
import Cushionsandthrows from "../user/pages/bedroom/cushionsandthrows";
import Wardrobesandstorage from "../user/pages/bedroom/wardrobesandstorage";


import Blanketsandthrows from "../user/pages/homedecor/blanketsandthrows";
import Curtainsandrollerblinds from "../user/pages/homedecor/curtainsandrollerblinds";
import Decorativeaccessories from "../user/pages/homedecor/decorativeaccessories";
import Candleholders from "../user/pages/homedecor/candleholders";
import Doorknobsandhooks from "../user/pages/homedecor/doorknobsandhooks";
import Cushions from "../user/pages/homedecor/cushions";



import Cleaning from "../user/pages/kitchenanddining/cleaning";
import Kitchenaccessories from "../user/pages/kitchenanddining/kitchenaccessories";
import Glasware from "../user/pages/kitchenanddining/glasware";
import Tablecloths from "../user/pages/kitchenanddining/tablecloths";
import Flatwareanddinnerware from "../user/pages/kitchenanddining/flatwareanddinnerware";




import Baby from "../user/pages/kidsandbaby/baby";
import Babybedding from "../user/pages/kidsandbaby/bedding";
import Basketsandstorage from "../user/pages/kidsandbaby/basketsandstorage";
import Bathroom from "../user/pages/kidsandbaby/bathroom";
import Pets from "../user/pages/pets/pets";











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
    "decorative-accessories": Decorativeaccessories,
    "candle-holders": Candleholders,
    "door-knobs-and-hooks": Doorknobsandhooks,
  },
  "kitchen-and-dining": {
    "tablecloths": Tablecloths,
    "glasware": Glasware,
    "kitchen-accessories": Kitchenaccessories,
    "cleaning": Cleaning,
    "flatwareanddinnerware": Flatwareanddinnerware,
  },
  "kids-and-baby": {
    "baby": Baby,
    "bedding": Babybedding,
    "baskets-and-storage":  Basketsandstorage,
    "bathroom": Bathroom,
  },
  "pets-collection": {
    "pets": Pets
  }
};
