import {Category, Group, Type} from "../models/Ranking";
import incomeDistributionData from './incomeDistribution.json'
import wealthDistributionData from './wealthDistribuion.json'
import populationData from './population.json';

export type DistributionDataFile = {
  metadata: any,
  distributions: Distribution[]
}

export type Percentiles = {
  [key: string]: number;
}

export type Distribution = {
  group: Group,
  percentiles: Percentiles
}

export type GroupPopulation = {
  group: Group,
  population: number
}

export type PopulationDataFile = {
  metadata: any
  populations: GroupPopulation[]
}

export function importDistributionDataFile(type: Type): DistributionDataFile {
  const distributionData = type.category === Category.INCOME ? incomeDistributionData : wealthDistributionData;

  return {
    metadata: distributionData.metadata,
    distributions: distributionData.distributions.map(distribution => {
      return {
        group: distribution.group as Group,
        percentiles: distribution.percentiles
      }
    })
  }
}

export function importPopulationDataFile(): PopulationDataFile {
  return {
    metadata: populationData.metadata,
    populations: populationData.populations.map(populationGroup => {
      return {
        group: populationGroup.group as Group,
        population: populationGroup.population
      }
    })
  }
}

