export const assetLifecycleData = [
  { asset_id: "P-771", asset_name: "SH09 Rural Stretch", asset_type: "Pavement", age_years: 20.4, expected_life_years: 18, remaining_life_years: 0, projected_replacement_year: 2025, replacement_cost: 1950000 },
  { asset_id: "S-908", asset_name: "Expressway Signage", asset_type: "Signage", age_years: 6.9, expected_life_years: 10, remaining_life_years: 3.1, projected_replacement_year: 2029, replacement_cost: 310000 },
  { asset_id: "L-332", asset_name: "City Lighting Corridor", asset_type: "Lighting", age_years: 8.5, expected_life_years: 12, remaining_life_years: 3.5, projected_replacement_year: 2029, replacement_cost: 275000 },
  { asset_id: "A-101", asset_name: "NH45 Segment 12", asset_type: "Pavement", age_years: 13.5, expected_life_years: 18, remaining_life_years: 4.5, projected_replacement_year: 2030, replacement_cost: 1200000 },
  { asset_id: "A-118", asset_name: "NH16 Urban Spur", asset_type: "Pavement", age_years: 10.2, expected_life_years: 18, remaining_life_years: 7.8, projected_replacement_year: 2033, replacement_cost: 800000 },
  { asset_id: "P-120", asset_name: "Feeder Road Cluster", asset_type: "Pavement", age_years: 7.2, expected_life_years: 18, remaining_life_years: 10.8, projected_replacement_year: 2036, replacement_cost: 1030000 },
  { asset_id: "D-512", asset_name: "Canal Drainage Spur", asset_type: "Drainage", age_years: 12.6, expected_life_years: 25, remaining_life_years: 12.4, projected_replacement_year: 2038, replacement_cost: 650000 },
  { asset_id: "D-045", asset_name: "Kaveri Culvert", asset_type: "Culvert", age_years: 15.1, expected_life_years: 30, remaining_life_years: 14.9, projected_replacement_year: 2040, replacement_cost: 450000 },
];

export const maintenanceForecastData = [
  { asset_id: "P-771", asset_name: "SH09 Rural Stretch", asset_type: "Pavement", condition_score: 49, forecast_condition: 46.5, months_to_threshold: 0, next_maintenance_date: "2025-11-27 00:00:00", maintenance_cost: 110000 },
  { asset_id: "B-220", asset_name: "Godavari Overpass", asset_type: "Bridge", condition_score: 58, forecast_condition: 55.6404, months_to_threshold: 0, next_maintenance_date: "2025-11-27 00:00:00", maintenance_cost: 145000 },
];

export const inspectionCycleData = [
  { asset_id: "P-771", asset_name: "SH09 Rural Stretch", asset_type: "Pavement", criticality: "High", condition_score: 48, risk_score: 69.5687, inspection_interval_months: 6, last_inspection_date: "2024-01-22 00:00:00", next_inspection_date: "2024-07-20 00:00:00" },
  { asset_id: "B-220", asset_name: "Godavari Overpass", asset_type: "Bridge", criticality: "High", condition_score: 58, risk_score: 65.4363, inspection_interval_months: 9, last_inspection_date: "2024-04-15 00:00:00", next_inspection_date: "2024-10-12 00:00:00" },
  { asset_id: "D-045", asset_name: "Kaveri Culvert", asset_type: "Culvert", criticality: "Medium", condition_score: 71, risk_score: 46.3385, inspection_interval_months: 9, last_inspection_date: "2024-02-20 00:00:00", next_inspection_date: "2024-11-16 00:00:00" },
  { asset_id: "D-512", asset_name: "Canal Drainage Spur", asset_type: "Drainage", criticality: "Medium", condition_score: 63, risk_score: 49.7841, inspection_interval_months: 9, last_inspection_date: "2024-03-19 00:00:00", next_inspection_date: "2024-12-14 00:00:00" },
  { asset_id: "A-118", asset_name: "NH16 Urban Spur", asset_type: "Pavement", criticality: "Medium", condition_score: 66, risk_score: 49.5164, inspection_interval_months: 9, last_inspection_date: "2024-05-28 00:00:00", next_inspection_date: "2025-02-22 00:00:00" },
  { asset_id: "A-101", asset_name: "NH45 Segment 12", asset_type: "Pavement", criticality: "High", condition_score: 78, risk_score: 55.9657, inspection_interval_months: 9, last_inspection_date: "2024-06-18 00:00:00", next_inspection_date: "2025-03-07 00:00:00" },
  { asset_id: "B-803", asset_name: "Riverfront Viaduct", asset_type: "Bridge", criticality: "High", condition_score: 82, risk_score: 53.6872, inspection_interval_months: 9, last_inspection_date: "2024-06-25 00:00:00", next_inspection_date: "2025-03-22 00:00:00" },
  { asset_id: "S-908", asset_name: "Expressway Signage", asset_type: "Signage", criticality: "Medium", condition_score: 74, risk_score: 46.2494, inspection_interval_months: 9, last_inspection_date: "2024-07-02 00:00:00", next_inspection_date: "2025-03-29 00:00:00" },
  { asset_id: "P-120", asset_name: "Feeder Road Cluster", asset_type: "Pavement", criticality: "Low", condition_score: 60, risk_score: 35.1927, inspection_interval_months: 12, last_inspection_date: "2024-05-30 00:00:00", next_inspection_date: "2025-05-25 00:00:00" },
  { asset_id: "L-332", asset_name: "City Lighting Corridor", asset_type: "Lighting", criticality: "Low", condition_score: 84, risk_score: 29.1261, inspection_interval_months: 18, last_inspection_date: "2024-07-05 00:00:00", next_inspection_date: "2025-12-27 00:00:00" },
];
