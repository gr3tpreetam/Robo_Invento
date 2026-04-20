// src/services/mouserAPI.js
// Mouser Electronics Search API wrapper
// API Docs: https://www.mouser.com/api-hub/

const MOUSER_API_KEY = import.meta.env.VITE_MOUSER_API_KEY;
const BASE_URL = 'https://api.mouser.com/api/v1';

// --- Expanded mock data with real publicly accessible images ---
const MOCK_RESULTS = {
  L298N: [
    {
      MouserPartNumber: 'STM-L298N',
      ManufacturerPartNumber: 'L298N',
      Manufacturer: 'STMicroelectronics',
      Description: 'Dual Full-Bridge Driver for DC and Stepper Motors, 2A per channel, 46V max. Ideal for driving two DC motors or one stepper motor.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/L298N-Module.jpg/320px-L298N-Module.jpg',
      DataSheetUrl: 'https://www.st.com/resource/en/datasheet/l298.pdf',
      Category: 'Motor Drivers',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Supply Voltage', AttributeValue: '4.5V ~ 46V' },
        { AttributeName: 'Current - Output', AttributeValue: '2A' },
        { AttributeName: 'Number of Outputs', AttributeValue: '4' },
        { AttributeName: 'Package / Case', AttributeValue: 'Multiwatt15' },
      ],
    },
  ],
  LM317: [
    {
      MouserPartNumber: 'TI-LM317T',
      ManufacturerPartNumber: 'LM317T',
      Manufacturer: 'Texas Instruments',
      Description: 'Adjustable Positive Linear Voltage Regulator, output adjustable from 1.25V to 37V with only two external resistors.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LM317_Adjustable_Regulator.jpg/320px-LM317_Adjustable_Regulator.jpg',
      DataSheetUrl: 'https://www.ti.com/lit/ds/symlink/lm317.pdf',
      Category: 'Linear Regulators',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Output Voltage', AttributeValue: '1.25V ~ 37V' },
        { AttributeName: 'Current - Output', AttributeValue: '1.5A' },
        { AttributeName: 'Package / Case', AttributeValue: 'TO-220-3' },
        { AttributeName: 'Quiescent Current', AttributeValue: '5mA' },
      ],
    },
  ],
  'HC-SR04': [
    {
      MouserPartNumber: 'HCSR04-ULTRASONIC',
      ManufacturerPartNumber: 'HC-SR04',
      Manufacturer: 'SparkFun Electronics',
      Description: 'Ultrasonic Ranging Module. Non-contact distance measurement from 2cm to 400cm with 3mm accuracy. Operating voltage: 5V.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Ultrasonic_sensor_-_HC_SR04.jpg/320px-Ultrasonic_sensor_-_HC_SR04.jpg',
      DataSheetUrl: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf',
      Category: 'Sensors',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Range', AttributeValue: '2cm ~ 400cm' },
        { AttributeName: 'Supply Voltage', AttributeValue: '5V DC' },
        { AttributeName: 'Frequency', AttributeValue: '40kHz' },
        { AttributeName: 'Accuracy', AttributeValue: '±3mm' },
      ],
    },
  ],
  HCSR04: [
    {
      MouserPartNumber: 'HCSR04-ULTRASONIC',
      ManufacturerPartNumber: 'HC-SR04',
      Manufacturer: 'SparkFun Electronics',
      Description: 'Ultrasonic Ranging Module. Non-contact distance measurement from 2cm to 400cm with 3mm accuracy. Operating voltage: 5V.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Ultrasonic_sensor_-_HC_SR04.jpg/320px-Ultrasonic_sensor_-_HC_SR04.jpg',
      DataSheetUrl: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf',
      Category: 'Sensors',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Range', AttributeValue: '2cm ~ 400cm' },
        { AttributeName: 'Supply Voltage', AttributeValue: '5V DC' },
        { AttributeName: 'Frequency', AttributeValue: '40kHz' },
        { AttributeName: 'Accuracy', AttributeValue: '±3mm' },
      ],
    },
  ],
  ESP32: [
    {
      MouserPartNumber: 'ESPRESSIF-ESP32-DEVKITC',
      ManufacturerPartNumber: 'ESP32-DevKitC-32E',
      Manufacturer: 'Espressif Systems',
      Description: 'ESP32 Development Board with Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BLE. Dual-core 240MHz Xtensa LX6, 520KB SRAM. Popular for IoT projects.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ESP32_Espressif_ESP-WROOM-32_devboard.jpg/320px-ESP32_Espressif_ESP-WROOM-32_devboard.jpg',
      DataSheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf',
      Category: 'Microcontrollers',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'CPU', AttributeValue: 'Dual-core 240MHz' },
        { AttributeName: 'Flash Memory', AttributeValue: '4MB' },
        { AttributeName: 'SRAM', AttributeValue: '520KB' },
        { AttributeName: 'Wireless', AttributeValue: 'Wi-Fi + BLE 4.2' },
      ],
    },
  ],
  Arduino: [
    {
      MouserPartNumber: 'ARDUINO-UNO-R3',
      ManufacturerPartNumber: 'A000066',
      Manufacturer: 'Arduino',
      Description: 'Arduino UNO R3 — ATmega328P based microcontroller board. 14 digital I/O pins, 6 analog inputs, USB connectivity. The most popular Arduino board for beginners.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Arduino_Uno_-_R3.jpg/320px-Arduino_Uno_-_R3.jpg',
      DataSheetUrl: 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf',
      Category: 'Microcontrollers',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Microcontroller', AttributeValue: 'ATmega328P' },
        { AttributeName: 'Clock Speed', AttributeValue: '16MHz' },
        { AttributeName: 'Flash Memory', AttributeValue: '32KB' },
        { AttributeName: 'Digital I/O Pins', AttributeValue: '14' },
      ],
    },
    {
      MouserPartNumber: 'ARDUINO-NANO',
      ManufacturerPartNumber: 'A000005',
      Manufacturer: 'Arduino',
      Description: 'Arduino Nano — Compact ATmega328P board, Mini-USB, breadboard-friendly. Same capabilities as Uno in a much smaller form factor.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Arduino_nano_isometr.jpg/320px-Arduino_nano_isometr.jpg',
      DataSheetUrl: 'https://docs.arduino.cc/resources/datasheets/A000005-datasheet.pdf',
      Category: 'Microcontrollers',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Microcontroller', AttributeValue: 'ATmega328P' },
        { AttributeName: 'Clock Speed', AttributeValue: '16MHz' },
        { AttributeName: 'Flash Memory', AttributeValue: '32KB' },
        { AttributeName: 'Form Factor', AttributeValue: 'Mini (18x45mm)' },
      ],
    },
  ],
  UNO: [
    {
      MouserPartNumber: 'ARDUINO-UNO-R3',
      ManufacturerPartNumber: 'A000066',
      Manufacturer: 'Arduino',
      Description: 'Arduino UNO R3 — ATmega328P based microcontroller board. 14 digital I/O pins, 6 analog inputs, USB connectivity. The most popular Arduino board for beginners.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Arduino_Uno_-_R3.jpg/320px-Arduino_Uno_-_R3.jpg',
      DataSheetUrl: 'https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf',
      Category: 'Microcontrollers',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Microcontroller', AttributeValue: 'ATmega328P' },
        { AttributeName: 'Clock Speed', AttributeValue: '16MHz' },
        { AttributeName: 'Flash Memory', AttributeValue: '32KB' },
        { AttributeName: 'Digital I/O Pins', AttributeValue: '14' },
      ],
    },
  ],
  NE555: [
    {
      MouserPartNumber: 'TI-NE555P',
      ManufacturerPartNumber: 'NE555P',
      Manufacturer: 'Texas Instruments',
      Description: 'Precision Timer — 555 classic timer IC. Operates in astable, monostable & bistable modes. Temperature range: 0°C to +70°C, 8-DIP package.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/NE555_Signetics.jpg/320px-NE555_Signetics.jpg',
      DataSheetUrl: 'https://www.ti.com/lit/ds/symlink/ne555.pdf',
      Category: 'ICs',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Supply Voltage', AttributeValue: '4.5V ~ 16V' },
        { AttributeName: 'Output Current', AttributeValue: '200mA' },
        { AttributeName: 'Package', AttributeValue: '8-DIP' },
        { AttributeName: 'Frequency', AttributeValue: 'Up to 500kHz' },
      ],
    },
  ],
  MPU6050: [
    {
      MouserPartNumber: 'TDK-MPU-6050',
      ManufacturerPartNumber: 'MPU-6050',
      Manufacturer: 'TDK InvenSense',
      Description: '6-Axis IMU — 3-axis Gyroscope + 3-axis Accelerometer with I2C interface. Used in drones, robots, and gesture controllers.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Gyroscope_accelerometer_MPU6050.jpg/320px-Gyroscope_accelerometer_MPU6050.jpg',
      DataSheetUrl: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',
      Category: 'Sensors',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Interface', AttributeValue: 'I2C (400kHz)' },
        { AttributeName: 'Gyroscope Range', AttributeValue: '±250/500/1000/2000°/s' },
        { AttributeName: 'Accel Range', AttributeValue: '±2/4/8/16g' },
        { AttributeName: 'Supply Voltage', AttributeValue: '3.3V ~ 5V' },
      ],
    },
  ],
  MOSFET: [
    {
      MouserPartNumber: 'IR-IRLZ44N',
      ManufacturerPartNumber: 'IRLZ44N',
      Manufacturer: 'Infineon Technologies',
      Description: 'N-Channel Logic Level Power MOSFET, 55V, 47A, TO-220AB. Logic-level gate drive, ideal for microcontroller PWM control circuits.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Transistors.agr.jpg/320px-Transistors.agr.jpg',
      DataSheetUrl: 'https://www.infineon.com/dgdl/irlz44npbf.pdf',
      Category: 'Transistors',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Drain-Source Voltage', AttributeValue: '55V' },
        { AttributeName: 'Continuous Drain Current', AttributeValue: '47A' },
        { AttributeName: 'Gate Threshold Voltage', AttributeValue: '1V ~ 2V' },
        { AttributeName: 'Package', AttributeValue: 'TO-220AB' },
      ],
    },
  ],
  Relay: [
    {
      MouserPartNumber: 'SRD-5VDC-SL-C',
      ManufacturerPartNumber: 'SRD-5VDC-SL-C',
      Manufacturer: 'Songle',
      Description: '5V DC Single Channel Relay Module with optocoupler isolation. Controls AC 250V/10A or DC 30V/10A loads from microcontroller GPIO.',
      ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Two_relays_from_a_telephone_switching_board.jpg/320px-Two_relays_from_a_telephone_switching_board.jpg',
      DataSheetUrl: null,
      Category: 'Connectors',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Coil Voltage', AttributeValue: '5V DC' },
        { AttributeName: 'Contact Rating AC', AttributeValue: '10A @ 250VAC' },
        { AttributeName: 'Contact Rating DC', AttributeValue: '10A @ 30VDC' },
        { AttributeName: 'Isolation', AttributeValue: 'Optocoupler' },
      ],
    },
  ],
};

/**
 * Search Mouser's catalog for a component keyword.
 * Falls back to rich mock data if no API key is configured.
 * @param {string} keyword - Component name or part number
 * @returns {Promise<Array>} - Array of component results
 */
export async function searchComponents(keyword) {
  if (!MOUSER_API_KEY || MOUSER_API_KEY === 'your_mouser_api_key_here') {
    // Demo mode — return fake data with simulated network latency
    await new Promise((r) => setTimeout(r, 700));

    const lowerKeyword = keyword.toLowerCase();

    // Find all matching mock keys (fuzzy matching)
    const matchedKeys = Object.keys(MOCK_RESULTS).filter((k) =>
      lowerKeyword.includes(k.toLowerCase()) || k.toLowerCase().includes(lowerKeyword)
    );

    if (matchedKeys.length > 0) {
      // Merge results from all matching keys
      return matchedKeys.flatMap((k) => MOCK_RESULTS[k]);
    }

    return generateMockResults(keyword);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/keyword?apiKey=${MOUSER_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          SearchByKeywordRequest: {
            keyword,
            records: 10,
            startingRecord: 0,
            searchOptions: 'None',
            searchWithYourSignUpLanguage: 'false',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Mouser API error: ${response.status}`);
    }

    const data = await response.json();
    return data.SearchResults?.Parts ?? [];
  } catch (error) {
    console.error('[mouserAPI] Search failed:', error);
    throw error;
  }
}

/** Generate a generic mock result when no specific match is found */
function generateMockResults(keyword) {
  return [
    {
      MouserPartNumber: `DEMO-${keyword.toUpperCase().slice(0, 6)}`,
      ManufacturerPartNumber: keyword.toUpperCase(),
      Manufacturer: 'Demo Manufacturer',
      Description: `${keyword} — Demo result. Add your Mouser API key in .env to see real product data, images, and datasheets.`,
      ImagePath: null,
      DataSheetUrl: null,
      Category: 'General',
      LifecycleStatus: 'Active',
      RoHSStatus: 'RoHS Compliant',
      ProductAttributes: [
        { AttributeName: 'Note', AttributeValue: 'Add VITE_MOUSER_API_KEY to .env for real data' },
      ],
    },
  ];
}
