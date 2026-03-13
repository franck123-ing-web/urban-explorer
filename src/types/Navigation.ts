// types/navigation.ts
import { Lieu } from './lieu'; // <-- ajout de l'import

export type DiscoveryStackParamList = {
   Home: undefined;
  ListeLieux: undefined;        // pas de param pour l'écran liste
  DetailLieu: { lieu: Lieu };   // param obligatoire pour l'écran détail
};