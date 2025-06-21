// leaflet.d.ts
import 'leaflet';

declare module 'leaflet' {
    interface Icon {
        _getIconUrl?: string;
    }
}
