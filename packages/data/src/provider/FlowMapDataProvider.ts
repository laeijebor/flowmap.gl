import {FlowMapState} from '../FlowMapState';
import {
  ClusterNode,
  Flow,
  FlowMapData,
  LayersData,
  Location,
  ViewportProps,
} from '../types';

export default interface FlowMapDataProvider {
  setFlowMapState(flowMapState: FlowMapState): Promise<void>;

  // clearData(): void;

  getViewportForLocations(dims: [number, number]): Promise<ViewportProps>;

  // getFlowTotals(): Promise<FlowTotals>;

  getFlowByIndex(index: number): Promise<Flow | undefined>;

  getLocationById(id: string): Promise<Location | ClusterNode | undefined>;

  getLocationByIndex(idx: number): Promise<Location | ClusterNode | undefined>;

  // getTotalsForLocation(id: string): Promise<LocationTotals | undefined>;

  // getLocationsInBbox(
  //   bbox: [number, number, number, number],
  // ): Promise<Array<Location | ClusterNode> | undefined>;

  // getLocationsForSearchBox(): Promise<(Location | ClusterNode)[] | undefined>;

  getLayersData(): Promise<LayersData | undefined>;
}

export function isFlowMapData(data: Record<string, any>): data is FlowMapData {
  return (
    data &&
    data.locations &&
    data.flows &&
    Array.isArray(data.locations) &&
    Array.isArray(data.flows)
  );
}

export function isFlowMapDataProvider(
  dataProvider: Record<string, any>,
): dataProvider is FlowMapDataProvider {
  return (
    dataProvider &&
    typeof dataProvider.setFlowMapState === 'function' &&
    typeof dataProvider.getViewportForLocations === 'function' &&
    typeof dataProvider.getFlowByIndex === 'function' &&
    typeof dataProvider.getLocationById === 'function' &&
    typeof dataProvider.getLocationByIndex === 'function' &&
    typeof dataProvider.getLayersData === 'function'
  );
}