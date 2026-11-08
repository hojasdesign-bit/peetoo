// Datos de retiro con QvaPay (docs: qvapay.com/docs/withdraw/examples).
// Las zonas de efectivo son las reales del tarifario (GET
// /withdraw/cash-zones?coin=USDCASH, 2026-11-06): 16 provincias,
// 132 municipios. La fuente de verdad sigue siendo el working_data
// de cada moneda (GET /coins/v2); esto es solo la referencia demo.
// Campos por zona: p provincia, c código, m municipio,
// pp provider_pct, mp margin_pct (null = margen global), min min_usd,
// flat small_flat_usd, etaMin/etaMax horas de entrega.

export const QVAPAY_CASH_MARGIN_GLOBAL = 1;

export const QVAPAY_ZONES = [
  { p: 'Artemisa', c: 'ART', m: 'Artemisa', pp: 3, mp: null, min: 50, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Artemisa', c: 'ART', m: 'Alquízar', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'Caimito', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'Candelaria', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'Guanajay', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'Güira de Melena', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'Mariel', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'San Antonio de los Baños', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Artemisa', c: 'ART', m: 'San Cristóbal', pp: 10, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Ciego de Ávila', pp: 1, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Chambas', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Ciro Redondo', pp: 1, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Florencia', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Morón', pp: 1, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Ciego de Ávila', c: 'CAV', m: 'Venezuela', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Cienfuegos', c: 'CFG', m: 'Cienfuegos', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Camagüey', c: 'CMG', m: 'Camagüey', pp: 3, mp: null, min: 50, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Camagüey', c: 'CMG', m: 'Florida', pp: 5, mp: null, min: 500, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Guáimaro', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Minas', pp: 5, mp: null, min: 500, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Najasa', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Nuevitas', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Sibanicú', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Camagüey', c: 'CMG', m: 'Vertientes', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Bayamo', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Granma', c: 'GRA', m: 'Bartolomé Masó', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Buey Arriba', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Campechuela', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Cauto Cristo', pp: 7, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Guisa', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Jiguaní', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Manzanillo', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Media Luna', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Niquero', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Pilón', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Río Cauto', pp: 6, mp: null, min: 500, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Granma', c: 'GRA', m: 'Yara', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'Guantánamo', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Guantánamo', c: 'GTM', m: 'Baracoa', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'El Salvador', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'Imías', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'Maisí', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'Manuel Tames', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'San Antonio del Sur', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Guantánamo', c: 'GTM', m: 'Yateras', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Holguín', pp: 3, mp: null, min: 50, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Holguín', c: 'HOL', m: 'Báguanos', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Banes', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Frank País', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Mayarí', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Moa', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Rafael Freyre', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Holguín', c: 'HOL', m: 'Sagua de Tánamo', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Isla de la Juventud', c: 'IJV', m: 'Isla de la Juventud', pp: 4, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'La Habana', c: 'LHA', m: 'Plaza de la Revolución', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Arroyo Naranjo', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Boyeros', pp: 1, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Centro Habana', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Cerro', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Cotorro', pp: 1, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Diez de Octubre', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Guanabacoa', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'La Habana del Este', pp: 1, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'La Habana Vieja', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'La Lisa', pp: 1, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'La Lisa · UCI', pp: 3, mp: 0, min: 50, flat: 20, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Marianao', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Playa', pp: 1, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'Regla', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'La Habana', c: 'LHA', m: 'San Miguel del Padrón', pp: 0, mp: 0, min: 50, flat: null, etaMin: 1, etaMax: 72 },
  { p: 'Las Tunas', c: 'LTU', m: 'Las Tunas', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Las Tunas', c: 'LTU', m: 'Amancio', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Las Tunas', c: 'LTU', m: 'Colombia', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Las Tunas', c: 'LTU', m: 'Jesús Menéndez', pp: 7, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Las Tunas', c: 'LTU', m: 'Majibacoa', pp: 9, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Las Tunas', c: 'LTU', m: 'Manatí', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Las Tunas', c: 'LTU', m: 'Puerto Padre', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'San José de las Lajas', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Mayabeque', c: 'MAY', m: 'Batabanó', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'Bejucal', pp: 9, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'Güines', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'Jaruco', pp: 9, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'Nueva Paz', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'San Nicolás', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Mayabeque', c: 'MAY', m: 'Santa Cruz del Norte', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Matanzas', pp: 3, mp: null, min: 20, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Matanzas', c: 'MTZ', m: 'Calimete', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Cárdenas', pp: 2, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Colón', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Jagüey Grande', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Jovellanos', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Limonar', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Los Arabos', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Martí', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Pedro Betancourt', pp: 3, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Perico', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Santa Marta', pp: 2, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Unión de Reyes', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Matanzas', c: 'MTZ', m: 'Varadero', pp: 2, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Pinar del Río', pp: 3, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Consolación del Sur', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Guane', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'La Palma', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Los Palacios', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Mantua', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'San Juan y Martínez', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'San Luis', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Sandino', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Pinar del Río', c: 'PRI', m: 'Viñales', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Santiago de Cuba', c: 'SCU', m: 'Santiago de Cuba', pp: 3, mp: null, min: 50, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Santiago de Cuba', c: 'SCU', m: 'Contramaestre', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Santiago de Cuba', c: 'SCU', m: 'Palma Soriano', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Santiago de Cuba', c: 'SCU', m: 'Segundo Frente', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Santiago de Cuba', c: 'SCU', m: 'Songo-La Maya', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Sancti Spíritus', pp: 2, mp: null, min: 100, flat: null, etaMin: 24, etaMax: 48 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Cabaiguán', pp: 4, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Fomento', pp: 7, mp: null, min: 100, flat: null, etaMin: 168, etaMax: 336 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Taguasco', pp: 7, mp: null, min: 100, flat: null, etaMin: 168, etaMax: 336 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Trinidad', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Sancti Spíritus', c: 'SSP', m: 'Yaguajay', pp: 6, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Santa Clara', pp: 1, mp: null, min: 20, flat: 4, etaMin: 24, etaMax: 48 },
  { p: 'Villa Clara', c: 'VCL', m: 'Caibarién', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Camajuaní', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Cifuentes', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Encrucijada', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Manicaragua', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Placetas', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Quemado de Güines', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Ranchuelo', pp: 5, mp: null, min: 200, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Remedios', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Sagua la Grande', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
  { p: 'Villa Clara', c: 'VCL', m: 'Santo Domingo', pp: 5, mp: null, min: 100, flat: null, etaMin: 48, etaMax: 144 },
];

// Provincias únicas (orden del tarifario) y municipios por provincia.
export const QVAPAY_PROVINCES = [...new Set(QVAPAY_ZONES.map((z) => z.p))];
export const qvapayMunicipalities = (province) => QVAPAY_ZONES.filter((z) => z.p === province).map((z) => z.m);
export const qvapayZone = (province, municipality) => QVAPAY_ZONES.find((z) => z.p === province && z.m === municipality) || null;
// Fee de una zona (municipio): el % es provider_pct + margen (el de la
// zona o el global cuando es null). Es por municipio, no por provincia.
export const qvapayZoneFeePct = (province, municipality) => {
  const z = qvapayZone(province, municipality);
  return z ? z.pp + (z.mp ?? QVAPAY_CASH_MARGIN_GLOBAL) : null;
};

// Cargo de la zona sobre el bruto (amount): max(bruto x pp%, flat) +
// bruto x margen% (margen de la zona o el global si es null).
export const cashZoneCharge = (amount, zone) => {
  if (!zone) return 0;
  const margin = zone.mp ?? QVAPAY_CASH_MARGIN_GLOBAL;
  return Math.max((amount * zone.pp) / 100, zone.flat ?? 0) + (amount * margin) / 100;
};

// Lo que se entrega en efectivo (billetes): bruto menos cargo, redondeado
// hacia abajo al múltiplo de 5.
export const cashReceive = (amount, zone) => {
  if (!zone || amount <= 0) return 0;
  return Math.max(0, Math.floor((amount - cashZoneCharge(amount, zone)) / 5) * 5);
};

// Fee de la moneda sobre el bruto (amount), según la documentación
// ("Cómo funciona fee_out_fixed"): si hay fee fijo y el monto es menor
// o igual al umbral, se cobra el fijo (sin porcentaje); si no, el
// porcentaje fee_out. Sin fee fijo, siempre el porcentaje.
export const coinFee = (amount, method) => {
  if (!method || amount <= 0) return 0;
  if (method.feeOutFixed && amount <= method.feeOutFixed[0]) return method.feeOutFixed[1];
  return (amount * (method.feeOut ?? 0)) / 100;
};

// Bruto mínimo que hay que retirar para entregar exactamente `target`
// (múltiplo de 5): se resuelve por búsqueda binaria, como recomienda la
// documentación (partir de lo que se quiere entregar, no de un bruto
// redondo). Un ajuste por iteración simple sobrepasa hasta $5 por el
// redondeo a billetes; la búsqueda da el mínimo al centavo.
export const cashBrutoFor = (target, zone) => {
  if (!zone || target <= 0) return 0;
  let lo = target;
  let hi = target + Math.max(50, target * 0.5);
  while (cashReceive(hi, zone) < target) hi *= 1.5;
  for (let i = 0; i < 40 && hi - lo >= 0.01; i += 1) {
    const mid = Math.round(((lo + hi) / 2) * 100) / 100;
    if (cashReceive(mid, zone) >= target) hi = mid;
    else lo = mid;
  }
  const bruto = Math.round(hi * 100) / 100;
  return cashReceive(bruto, zone) >= target ? bruto : Math.round((bruto + 0.01) * 100) / 100;
};

export const fmtUsd = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Métodos de retiro (tabla de la documentación, vigentes 2026-10-20).
// fields: claves exactas del working_data, con su tipo y ejemplo.
// Países de la selección de método de retiro (el panel del widget):
// Cuba sale por defecto; Estados Unidos agrupa Zelle, transferencia
// en EE. UU. y SWIFT. El campo `country` de cada método lo ubica.
// Cryptos con las que se puede pagar el retiro: stablecoins en USD (1:1),
// así el monto en crypto equivale al monto en USD para la comisión y el
// estimado. EURC no entra: está anclada al euro y no hay tasa EUR/USD.
export const QVAPAY_PAY_CRYPTOS = [
  { code: 'USDT', label: 'Tether USD' },
  { code: 'USDC', label: 'USD Coin' },
  { code: 'USAT', label: 'Tether USAT' },
  { code: 'PYUSD', label: 'PayPal USD' },
  { code: 'ZLUSD', label: 'Zelle USD' },
  { code: 'OUSD', label: 'Origin USD' },
];

// Cadenas (blockchains) para pagar con crypto: cada cadena ofrece las
// stablecoins que existen en ella. BNB Chain sale por defecto: es la
// que más se usa en Cuba. Al cambiar de cadena, la crypto se ajusta a
// la primera de esa cadena si la elegida no existe en ella.
export const QVAPAY_PAY_CHAINS = [
  { code: 'BSC', label: 'BNB Chain', cryptos: ['USDT', 'USDC', 'ZLUSD'] },
  { code: 'ETH', label: 'Ethereum', cryptos: ['USDT', 'USDC', 'USAT', 'PYUSD', 'OUSD'] },
  { code: 'POL', label: 'Polygon', cryptos: ['USDT', 'USDC'] },
  { code: 'ARB', label: 'Arbitrum', cryptos: ['USDT', 'USDC'] },
  { code: 'OP', label: 'Optimism', cryptos: ['USDT', 'USDC'] },
  { code: 'BASE', label: 'Base', cryptos: ['USDT', 'USDC'] },
  { code: 'SOL', label: 'Solana', cryptos: ['USDT', 'USDC', 'PYUSD'] },
  { code: 'TRX', label: 'Tron', cryptos: ['USDT'] },
];

// Fiats que se pueden recibir (la tarjeta CUP es la única vía para CUP).
export const QVAPAY_RECEIVE_FIATS = [
  { code: 'USD', label: 'Dólar estadounidense' },
  { code: 'CUP', label: 'Peso cubano' },
];

// Tasa de conversión USD→CUP para el estimado (ancla elTOQUE, como Divisa).
export const QVAPAY_CUP_RATE = 890;

export const QVAPAY_COUNTRIES = [
  { code: 'CU', label: 'Cuba' },
  { code: 'US', label: 'Estados Unidos' },
];

export const QVAPAY_METHODS = [
  {
    tick: 'USDCASH',
    country: 'CU',
    fiat: 'USD',
    label: 'Efectivo en Cuba',
    short: 'Efectivo',
    kind: 'cash',
    min: 50,
    feeOut: 0,
    feeOutFixed: [99.99, 5],
    feeNote: 'Cargo por zona · $5 de fee si retiras $99,99 o menos',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Carnet de Identidad', type: 'number', placeholder: '85010112345', hint: '11 dígitos' },
      { key: 'Nro de Celular', type: 'phone', placeholder: '+5355512345', hint: 'Con C mayúscula, tal cual' },
      { key: 'Dirección', type: 'text', placeholder: 'Calle Martí #123 e/ Céspedes y Maceo, Reparto Centro' },
      { key: 'Provincia', type: 'select-province', placeholder: 'Elige la provincia' },
      { key: 'Municipio', type: 'select-municipality', placeholder: 'Elige el municipio' },
    ],
  },
  {
    tick: 'BANK_CUP',
    country: 'CU',
    fiat: 'CUP',
    label: 'Tarjeta CUP',
    short: 'CUP',
    kind: 'card',
    min: 1,
    feeOut: 10,
    feeOutFixed: null,
    feeNote: 'La tarjeta tiene que ser CUP',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nro de tarjeta', type: 'number', placeholder: '9227 0699 1234 5678', hint: '16 dígitos' },
      { key: 'Nro de celular', type: 'phone', placeholder: '+5355512345', hint: 'Con c minúscula, tal cual' },
    ],
  },
  {
    tick: 'BANK_MLC',
    country: 'CU',
    fiat: 'USD',
    label: 'Tarjeta MLC',
    short: 'MLC',
    kind: 'card',
    min: 1,
    feeOut: 15,
    feeOutFixed: null,
    feeNote: 'La tarjeta tiene que ser MLC',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nro de tarjeta', type: 'number', placeholder: '9227 0699 1234 5678', hint: '16 dígitos' },
      { key: 'Nro de celular', type: 'phone', placeholder: '+5355512345', hint: 'Con c minúscula, tal cual' },
    ],
  },
  {
    tick: 'CLASICA',
    country: 'CU',
    fiat: 'USD',
    label: 'Tarjeta Clásica',
    short: 'Clásica',
    kind: 'card',
    min: 1,
    feeOut: 2.5,
    feeOutFixed: null,
    feeNote: 'La tarjeta tiene que ser Clásica',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nro de tarjeta', type: 'number', placeholder: '9227 0699 1234 5678', hint: '16 dígitos' },
      { key: 'Nro de celular', type: 'phone', placeholder: '+5355512345', hint: 'Con c minúscula, tal cual' },
    ],
  },
  {
    tick: 'TROPICAL',
    country: 'CU',
    fiat: 'USD',
    label: 'Tarjeta Tropical',
    short: 'Tropical',
    kind: 'card',
    min: 1,
    feeOut: 5,
    feeOutFixed: null,
    feeNote: 'Prepago en USD (también vale BANDECPREPAGO)',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nro de tarjeta', type: 'number', placeholder: '9227 0699 1234 5678', hint: '16 dígitos' },
      { key: 'Nro de celular', type: 'phone', placeholder: '+5355512345', hint: 'Con c minúscula, tal cual' },
    ],
  },
  {
    tick: 'ZELLE',
    country: 'US',
    fiat: 'USD',
    label: 'Zelle',
    short: 'Zelle',
    kind: 'zelle',
    min: 50,
    feeOut: 1,
    feeOutFixed: [100, 2],
    feeNote: 'Correo o celular del destinatario',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Correo o Celular', type: 'text', placeholder: 'nombre@correo.com o +1 555 123 4567' },
    ],
  },
  {
    tick: 'BANK',
    country: 'US',
    fiat: 'USD',
    label: 'Transferencia en EE. UU.',
    short: 'Banco EE. UU.',
    kind: 'bank',
    min: 100,
    feeOut: 2,
    feeOutFixed: null,
    feeNote: 'Transferencia en USD a un banco de EE. UU.',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nombre del Banco', type: 'text', placeholder: 'Chase Bank' },
      { key: 'Nro de Cuenta', type: 'number', placeholder: '123456789' },
      { key: 'Nro de Ruta o ACH', type: 'number', placeholder: '021000021', hint: 'ABA de 9 dígitos' },
      { key: 'Nro de telefono', type: 'phone', placeholder: '+1 555 123 4567' },
      { key: 'Direccion', type: 'text', placeholder: 'Calle y número, ciudad, estado', hint: 'Sin tilde, tal cual' },
    ],
  },
  {
    tick: 'BANK_INTL',
    country: 'US',
    fiat: 'USD',
    label: 'Transferencia internacional',
    short: 'SWIFT',
    kind: 'bank_intl',
    min: 100,
    feeOut: 2,
    feeOutFixed: null,
    feeNote: 'Transferencia internacional por SWIFT',
    fields: [
      { key: 'Nombre y Apellidos', type: 'text', placeholder: 'Yanelis Pérez Rodríguez' },
      { key: 'Nombre del Banco', type: 'text', placeholder: 'Banco Santander' },
      { key: 'País', type: 'text', placeholder: 'España' },
      { key: 'SWIFT', type: 'text', placeholder: 'BSCHESMM' },
      { key: 'Nro de Cuenta', type: 'number', placeholder: 'ES91 2100 0418 4502 0005 1332' },
      { key: 'Nro de telefono', type: 'phone', placeholder: '+34 600 123 456' },
      { key: 'Direccion', type: 'text', placeholder: 'Calle y número, ciudad', hint: 'Sin tilde, tal cual' },
    ],
  },
];


// Contactos guardados (demo): beneficiarios con sus datos ya completos.
// Elegir uno rellena el formulario del método, como los métodos guardados
// de QvaPay (GET /user/payment-methods). Yanelis es el ejemplo de la
// documentación; los otros dos son ficticios, como el resto de peetoo.
export const QVAPAY_SAVED_CONTACTS = [
  {
    name: 'Yanelis Pérez Rodríguez',
    tick: 'USDCASH',
    details: {
      'Nombre y Apellidos': 'Yanelis Pérez Rodríguez',
      'Carnet de Identidad': '85010112345',
      'Nro de Celular': '+5355512345',
      'Dirección': 'Calle Martí #123 e/ Céspedes y Maceo, Reparto Centro',
      'Provincia': 'Villa Clara',
      'Municipio': 'Santa Clara',
    },
  },
  {
    name: 'Luis Fernández Gómez',
    tick: 'BANK_CUP',
    details: {
      'Nombre y Apellidos': 'Luis Fernández Gómez',
      'Nro de tarjeta': '9227069987654321',
      'Nro de celular': '+5355512345',
    },
  },
  {
    name: 'María González Ruiz',
    tick: 'ZELLE',
    details: {
      'Nombre y Apellidos': 'María González Ruiz',
      'Correo o Celular': 'maria.gonzalez@correo.com',
    },
  },
];

// Contenido de la página (hero, pasos, métodos populares, nota de comisiones).
// Una sola versión: el retiro general. La de solo efectivo era una prueba.
export const QVAPAY_CONTENT = {
  title: 'Retirar con QvaPay',
  description: 'Retira tu saldo en efectivo, a tarjeta, por Zelle o por transferencia, con el formulario exacto que pide QvaPay para cada método.',
  stepsTitle: 'Retirar en 3 pasos',
  steps: [
    { title: 'Elige el monto y el método', text: 'Escribe cuánto quieres retirar y por dónde lo quieres recibir: efectivo, tarjeta, Zelle o banco.', visual: 'buy-select' },
    { title: 'Completa los datos del beneficiario', text: 'El formulario cambia con el método: solo pide las claves exactas que QvaPay necesita, ni una más ni una menos.', visual: 'pay' },
    { title: 'Confirma y sigue el estado', text: 'Revisa el monto, la comisión y el plazo estimado. El estado del retiro llega por webhook y se puede consultar en cualquier momento.', visual: 'receive-bank' },
  ],
};
