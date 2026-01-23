import Beddingadmin from "../admin/pages/bedroom/bedding";
import Bedspreadsadmin from "../admin/pages/bedroom/bedspreads";
import Cushionsandthrowsadmin from "../admin/pages/bedroom/cushionsandthrows";
import Duvetcoversadmin from "../admin/pages/bedroom/duvetcovers";
import Quiltsadmin from "../admin/pages/bedroom/quilts";
import Seealladmin from "../admin/pages/bedroom/seeallbedroom";
import Wardrobesandstorageadmin from "../admin/pages/bedroom/wardrobesandstorage";
import Blanketsandthrowsadmin from "../admin/pages/homedecor/blanketsandthrows";
import Candleholdersadmin from "../admin/pages/homedecor/candleholders";
import Curtainsandrollerblindsadmin from "../admin/pages/homedecor/curtainsandrollerblinds";
import Cushionsadmin from "../admin/pages/homedecor/cushions";
import Decorativeaccessoriesadmin from "../admin/pages/homedecor/decorativeaccessories";
import Doorknobsandhooksadmin from "../admin/pages/homedecor/doorknobsandhooks";
import Babyadmin from "../admin/pages/kidsandbaby/baby";
import Basketsandstorageadmin from "../admin/pages/kidsandbaby/basketsandstorage";
import Bathroomadmin from "../admin/pages/kidsandbaby/bathroom";
import Babybeddingadmin from "../admin/pages/kidsandbaby/bedding";
import Cleaningadmin from "../admin/pages/kitchenanddining/cleaning";
import Flatwareanddinnerwareadmin from "../admin/pages/kitchenanddining/flatwareanddinnerware";
import Glaswareadmin from "../admin/pages/kitchenanddining/glasware";
import Kitchenaccessoriesadmin from "../admin/pages/kitchenanddining/kitchenaccessories";
import Tableclothsadmin from "../admin/pages/kitchenanddining/tablecloths";
import Petsadmin from "../admin/pages/pets/pets";

export const adminSubcategoryComponentsMap = {
  bedroom: {
    "see-all": Seealladmin,
    "bedding": Beddingadmin,
    "duvet-covers": Duvetcoversadmin,
    "quilts": Quiltsadmin,
    "bedspreads": Bedspreadsadmin,
    "cushions-and-throws": Cushionsandthrowsadmin,
    "wardrobes-and-storage": Wardrobesandstorageadmin,
  },
  "home-decor": {
    "blankets-and-throws": Blanketsandthrowsadmin,
    "cushions": Cushionsadmin,
    "curtains-and-roller-blinds": Curtainsandrollerblindsadmin,
    "decorative-accessories": Decorativeaccessoriesadmin,
    "candle-holders": Candleholdersadmin,
    "door-knobs-and-hooks": Doorknobsandhooksadmin,
  },
  "kitchen-and-dining": {
    "tablecloths": Tableclothsadmin,
    "glasware": Glaswareadmin,
    "kitchen-accessories": Kitchenaccessoriesadmin,
    "cleaning": Cleaningadmin,
    "flatwareanddinnerware": Flatwareanddinnerwareadmin,
  },
  "kids-and-baby": {
    "baby": Babyadmin,
    "bedding": Babybeddingadmin,
    "baskets-and-storage":  Basketsandstorageadmin,
    "bathroom": Bathroomadmin,
  },
  "pets-collection": {
    "pets": Petsadmin
  }
};