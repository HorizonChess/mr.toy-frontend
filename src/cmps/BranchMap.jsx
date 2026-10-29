import { useState } from 'react'
// "Map as GoogleMap": a plain `Map` would shadow JavaScript's built-in Map in this file
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps'

import { utilService } from '../services/util.service.js'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

const BRANCHES = [
    { id: 'tlv', name: 'Tel Aviv', position: { lat: 32.0853, lng: 34.7818 } },
    { id: 'hadera', name: 'Hadera', position: { lat: 32.4340, lng: 34.9197 } },
    { id: 'bat-yam', name: 'Bat Yam', position: { lat: 32.0132, lng: 34.7480 } },
]

// Between the three branches, zoomed out enough to see them all
const DEFAULT_CENTER = { lat: 32.22, lng: 34.84 }
const DEFAULT_ZOOM = 9
const BRANCH_ZOOM = 13

export function BranchMap() {
    const [selectedBranchId, setSelectedBranchId] = useState(null)

    // Read once per render: the map's pins match the app's palette
    const pinClr = utilService.getCssVar('--clr-primary')
    const pinBorderClr = utilService.getCssVar('--clr-primary-dark')

    return (
        <section className="branch-map">
            <APIProvider apiKey={API_KEY}>
                <BranchButtons selectedBranchId={selectedBranchId} onSelectBranch={setSelectedBranchId} />

                <div className="map-container">
                    <GoogleMap
                        defaultCenter={DEFAULT_CENTER}
                        defaultZoom={DEFAULT_ZOOM}
                        mapId="DEMO_MAP_ID"
                        gestureHandling="cooperative"
                    >
                        {BRANCHES.map(branch =>
                            <AdvancedMarker key={branch.id} position={branch.position} title={branch.name}>
                                <Pin
                                    background={pinClr}
                                    borderColor={pinBorderClr}
                                    glyphColor="white"
                                    scale={branch.id === selectedBranchId ? 1.4 : 1}
                                />
                            </AdvancedMarker>
                        )}
                    </GoogleMap>
                </div>
            </APIProvider>
        </section>
    )
}

// Its own component because useMap() only works inside <APIProvider>
function BranchButtons({ selectedBranchId, onSelectBranch }) {
    const map = useMap()

    // A user click, so the camera move lives in the handler - no effect needed.
    // panTo animates, and the user can still drag the map freely afterwards
    function onBranchClick(branch) {
        onSelectBranch(branch.id)
        map?.panTo(branch.position)
        map?.setZoom(BRANCH_ZOOM)
    }

    return (
        <nav className="branch-btns">
            {BRANCHES.map(branch =>
                <button
                    key={branch.id}
                    className={branch.id === selectedBranchId ? '' : 'btn-outline'}
                    onClick={() => onBranchClick(branch)}
                >
                    {branch.name}
                </button>
            )}
        </nav>
    )
}
