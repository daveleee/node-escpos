/**
 * Utility function that converts numbers into hex values
 *
 * @usage:
 *   numToHex(256) => '0100'
 *   numToHex(0) => '00'
 */
const numToHexString = function (value: number | string) {
  value = +value;
  if (!isNaN(value)) {
    value = (value).toString(16);
    while(value.length % 2 !== 0) {
      value = '0' + value;
    }
  }
  return value;
};

export const LF = '\x0a';
export const FS = '\x1c';
export const FF = '\x0c';
export const GS = '\x1d';
export const DLE = '\x10';
export const EOT = '\x04';
export const NUL = '\x00';
export const ESC = '\x1b';
export const TAB = '\x74';
export const EOL = '\n';

/**
 * [FEED_CONTROL_SEQUENCES Feed control sequences]
 * @type {Object}
 */
export const FEED_CONTROL_SEQUENCES = {
  CTL_LF: '\x0a',   // Print and line feed
  CTL_GLF: '\x4a\x00',   // Print and feed paper (without spaces between lines)
  CTL_FF: '\x0c',   // Form feed
  CTL_CR: '\x0d',   // Carriage return
  CTL_HT: '\x09',   // Horizontal tab
  CTL_VT: '\x0b',   // Vertical tab
};

export const CHARACTER_SPACING = {
  CS_DEFAULT: '\x1b\x20\x00',
  CS_SET: '\x1b\x20'
}

export const LINE_SPACING = {
  LS_DEFAULT: '\x1b\x32',
  LS_SET: '\x1b\x33'
};

/**
 * [HARDWARE Printer hardware]
 * @type {Object}
 */
export const HARDWARE = {
  HW_INIT: '\x1b\x40', // Clear data in buffer and reset modes
  HW_SELECT: '\x1b\x3d\x01', // Printer select
  HW_RESET: '\x1b\x3f\x0a\x00', // Reset printer hardware
};

/**
 * [CASH_DRAWER Cash Drawer]
 * @type {Object}
 */
export const CASH_DRAWER = {
  CD_KICK_2: '\x1b\x70\x00\x19\x78', // Sends a pulse to pin 2 []
  CD_KICK_5: '\x1b\x70\x01\x19\x78', // Sends a pulse to pin 5 []
};

/**
 * [MARGINS Margins sizes]
 * @type {Object}
 */
export const MARGINS = {
  BOTTOM: '\x1b\x4f', // Fix bottom size
  LEFT: '\x1b\x6c', // Fix left size
  RIGHT: '\x1b\x51', // Fix right size
};

/**
 * [PAPER Paper]
 * @type {Object}
 */
export const PAPER = {
  PAPER_FULL_CUT: '\x1d\x56\x00', // Full cut paper
  PAPER_PART_CUT: '\x1d\x56\x01', // Partial cut paper
  PAPER_CUT_A: '\x1d\x56\x41', // Partial cut paper
  PAPER_CUT_B: '\x1d\x56\x42', // Partial cut paper
};

/**
 * [TEXT_FORMAT Text format]
 * @type {Object}
 */
export const TEXT_FORMAT = {

  TXT_NORMAL: '\x1b\x21\x00', // Normal text
  TXT_2HEIGHT: '\x1b\x21\x10', // Double height text
  TXT_2WIDTH: '\x1b\x21\x20', // Double width text
  TXT_4SQUARE: '\x1b\x21\x30', // Double width & height text

  TXT_CUSTOM_SIZE: function(width: number, height: number) { // other sizes
    width = width > 8 ? 8 : width;
    width = width < 1 ? 1 : width;
    height = height > 8 ? 8 : height;
    height = height < 1 ? 1 : height;

    var widthDec = (width - 1) * 16; // Values between 1-8
    var heightDec = height - 1; // Values between 1-8
    var sizeDec = widthDec + heightDec;
    /*
    * @todo I would suggest replacing the return line by the code below since
    *         `String.fromCharCode()` can generate undesirable results.
    *
    * return Buffer.from('1d21' + numToHexString(sizeDec), 'hex');
    * */
    return '\x1d\x21' + String.fromCharCode(sizeDec);
  },

  TXT_HEIGHT: {
    1: '\x00',
    2: '\x01',
    3: '\x02',
    4: '\x03',
    5: '\x04',
    6: '\x05',
    7: '\x06',
    8: '\x07'
  },
  TXT_WIDTH: {
    1: '\x00',
    2: '\x10',
    3: '\x20',
    4: '\x30',
    5: '\x40',
    6: '\x50',
    7: '\x60',
    8: '\x70'
  },

  TXT_UNDERL_OFF: '\x1b\x2d\x00', // Underline font OFF
  TXT_UNDERL_ON: '\x1b\x2d\x01', // Underline font 1-dot ON
  TXT_UNDERL2_ON: '\x1b\x2d\x02', // Underline font 2-dot ON
  TXT_BOLD_OFF: '\x1b\x45\x00', // Bold font OFF
  TXT_BOLD_ON: '\x1b\x45\x01', // Bold font ON
  TXT_ITALIC_OFF: '\x1b\x35', // Italic font ON
  TXT_ITALIC_ON: '\x1b\x34', // Italic font ON

  TXT_FONT_A: '\x1b\x4d\x00', // Font type A
  TXT_FONT_B: '\x1b\x4d\x01', // Font type B
  TXT_FONT_C: '\x1b\x4d\x02', // Font type C

  TXT_ALIGN_LT: '\x1b\x61\x00', // Left justification
  TXT_ALIGN_CT: '\x1b\x61\x01', // Centering
  TXT_ALIGN_RT: '\x1b\x61\x02', // Right justification
};

/**
 * Qsprinter-compatible
 * Added by Attawit Kittikrairit
 * [MODEL Model-specific commands]
 * @type {Object}
 */
export const MODEL = {
  QSPRINTER: {
    BARCODE_MODE: {
      ON: '\x1d\x45\x43\x01', // Barcode mode on
      OFF: '\x1d\x45\x43\x00', // Barcode mode off
    },
    BARCODE_HEIGHT_DEFAULT: '\x1d\x68\xA2', // Barcode height default:162
    CODE2D_FORMAT: {
      PIXEL_SIZE: {
        CMD: '\x1b\x23\x23\x51\x50\x49\x58',
        MIN: 1,
        MAX: 24,
        DEFAULT: 12,
      },
      VERSION: {
        CMD: '\x1d\x28\x6b\x03\x00\x31\x43',
        MIN: 1,
        MAX: 16,
        DEFAULT: 3,
      },
      LEVEL: {
        CMD: '\x1d\x28\x6b\x03\x00\x31\x45',
        OPTIONS: {
          L: 48,
          M: 49,
          Q: 50,
          H: 51,
        }
      },
      LEN_OFFSET: 3,
      SAVEBUF: {
        // Format: CMD_P1{LEN_2BYTE}CMD_P2{DATA}
        // DATA Max Length: 256*256 - 3 (65533)
        CMD_P1: '\x1d\x28\x6b',
        CMD_P2: '\x31\x50\x30',
      },
      PRINTBUF: {
        // Format: CMD_P1{LEN_2BYTE}CMD_P2
        CMD_P1: '\x1d\x28\x6b',
        CMD_P2: '\x31\x51\x30',
      }
    },
  },
};

/**
 * [BARCODE_FORMAT Barcode format]
 * @type {Object}
 */
export const BARCODE_FORMAT = {
  BARCODE_TXT_OFF: '\x1d\x48\x00', // HRI barcode chars OFF
  BARCODE_TXT_ABV: '\x1d\x48\x01', // HRI barcode chars above
  BARCODE_TXT_BLW: '\x1d\x48\x02', // HRI barcode chars below
  BARCODE_TXT_BTH: '\x1d\x48\x03', // HRI barcode chars both above and below

  BARCODE_FONT_A: '\x1d\x66\x00', // Font type A for HRI barcode chars
  BARCODE_FONT_B: '\x1d\x66\x01', // Font type B for HRI barcode chars

  BARCODE_HEIGHT: function (height: number) { // Barcode Height [1-255]
    return Buffer.from('1d68'+ numToHexString(height), 'hex');
  },
  // Barcode Width  [2-6]
  BARCODE_WIDTH: {
    1: '\x1d\x77\x02',
    2: '\x1d\x77\x03',
    3: '\x1d\x77\x04',
    4: '\x1d\x77\x05',
    5: '\x1d\x77\x06',
  },
  BARCODE_HEIGHT_DEFAULT: '\x1d\x68\x64', // Barcode height default:100
  BARCODE_WIDTH_DEFAULT: '\x1d\x77\x01', // Barcode width default:1

  BARCODE_UPC_A: '\x1d\x6b\x00', // Barcode type UPC-A
  BARCODE_UPC_E: '\x1d\x6b\x01', // Barcode type UPC-E
  BARCODE_EAN13: '\x1d\x6b\x02', // Barcode type EAN13
  BARCODE_EAN8: '\x1d\x6b\x03', // Barcode type EAN8
  BARCODE_CODE39: '\x1d\x6b\x04', // Barcode type CODE39
  BARCODE_ITF: '\x1d\x6b\x05', // Barcode type ITF
  BARCODE_NW7: '\x1d\x6b\x06', // Barcode type NW7
  BARCODE_CODE93: '\x1d\x6b\x48', // Barcode type CODE93
  BARCODE_CODE128: '\x1d\x6b\x49', // Barcode type CODE128
};

/**
 * [CODE2D_FORMAT description]
 * @type {Object}
 */
export const CODE2D_FORMAT = {
  TYPE_PDF417: GS + 'Z' + '\x00',
  TYPE_DATAMATRIX: GS + 'Z' + '\x01',
  TYPE_QR: GS + 'Z' + '\x02',
  CODE2D: ESC + 'Z',
  QR_LEVEL_L: 'L', // correct level 7%
  QR_LEVEL_M: 'M', // correct level 15%
  QR_LEVEL_Q: 'Q', // correct level 25%
  QR_LEVEL_H: 'H'  // correct level 30%
};

/**
 * [IMAGE_FORMAT Image format]
 * @type {Object}
 */
export const IMAGE_FORMAT = {
  S_RASTER_N: '\x1d\x76\x30\x00', // Set raster image normal size
  S_RASTER_2W: '\x1d\x76\x30\x01', // Set raster image double width
  S_RASTER_2H: '\x1d\x76\x30\x02', // Set raster image double height
  S_RASTER_Q: '\x1d\x76\x30\x03', // Set raster image quadruple
};

/**
 * [BITMAP_FORMAT description]
 * @type {Object}
 */
export const BITMAP_FORMAT = {
  BITMAP_S8: '\x1b\x2a\x00',
  BITMAP_D8: '\x1b\x2a\x01',
  BITMAP_S24: '\x1b\x2a\x20',
  BITMAP_D24: '\x1b\x2a\x21'
};

/**
 * [GSV0_FORMAT description]
 * @type {Object}
 */
export const GSV0_FORMAT = {
  GSV0_NORMAL: '\x1d\x76\x30\x00',
  GSV0_DW: '\x1d\x76\x30\x01',
  GSV0_DH: '\x1d\x76\x30\x02',
  GSV0_DWDH: '\x1d\x76\x30\x03'
};

/**
 * [BEEP description]
 * @type {string}
 */
export const BEEP = '\x1b\x42'; // Printer Buzzer pre hex

/**
 * [COLOR description]
 * @type {Object}
 */
export const COLOR = {
  0: '\x1b\x72\x00', // black
  1: '\x1b\x72\x01', // red
  REVERSE: '\x1dB1', // Reverses the colors - white text on black background
  UNREVERSE: '\x1dB0' // Default: undo the reverse - black text on white background
};
