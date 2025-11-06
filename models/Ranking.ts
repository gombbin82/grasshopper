import {UserProfile} from "./UserProfile";
import {Percentiles} from "../data/DataFile";

export interface RankResult {
  all: Rank,
  others: Rank[]
}

export enum Category {
  INCOME,
  NET_WORTH
}

export enum Group {
  ALL = 'ALL',
  COUNTRY = 'COUNTRY'
}

export interface Type {
  category: Category,
  group: Group
}

export interface Rank {
  type: Type
  metadata: {
    country?: string
  }
  data: {
    percentiles: Percentiles
    population: number
    rank?: number
    rankPercentile?: number
  }
}

export interface RankRequest {
  type: Type,
  userProfile: UserProfile
}