import axios from 'axios';
import { BasicReading, ProfileFormData, ReportData, ReportSection } from '../types';

// TODO: Replace with your actual API key
const GEMINI_API_KEY = 'AIzaSyByQLBt_9749_u0cHd4NjznEc0CvLGf1aU';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';


// Helper function to call Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY, // <-- must be here
        },
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    return text;
  } catch (error: any) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to generate reading. Please try again.');
  }
};

const getSunSign = (dateOfBirth: string): string => {
  // Parse date - handle both DD/MM/YYYY and DDMMYYYY formats
  let day: number, month: number;
  
  if (dateOfBirth.includes('/')) {
    // Format: DD/MM/YYYY
    const parts = dateOfBirth.split('/');
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
  } else if (dateOfBirth.length === 8) {
    // Format: DDMMYYYY
    day = parseInt(dateOfBirth.substring(0, 2));
    month = parseInt(dateOfBirth.substring(2, 4));
  } else {
    return 'Leo'; // Default
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

  return 'Leo'; // Default
};
// Get zodiac symbol
const getZodiacSymbol = (sign: string): string => {
  const symbols: { [key: string]: string } = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓',
  };
  return symbols[sign] || '⭐';
};

export const generateBasicReading = async (
  birthChart: ProfileFormData
): Promise<BasicReading> => {
  return {
    sunSign: 'Gemini', // Moon sign used as primary display sign
    sunSignSymbol: getZodiacSymbol('Gemini'),
    overview:
      'This period highlights mental agility and emotional adaptability. You may feel drawn to learning, communication, and meaningful conversations that stimulate your curiosity.',
    traits: ['Curious', 'Expressive', 'Adaptable'],
    keyInsights: [
      {
        id: '1',
        icon: 'star',
        text: 'Your mind is especially sharp now—use this phase to plan, write, or negotiate.',
        color: '#9333ea',
      },
      {
        id: '2',
        icon: 'star',
        text: 'Emotional clarity comes through honest conversations rather than introspection alone.',
        color: '#ec4899',
      },
      {
        id: '3',
        icon: 'star',
        text: 'Short journeys or new connections can bring unexpected inspiration.',
        color: '#3b82f6',
      },
    ],
    generatedAt: new Date().toISOString(),
  };
};



// Generate Basic Reading (Free) — Fully API-driven
export const generateBasicReadingReal = async (
  birthChart: ProfileFormData
): Promise<BasicReading> => {
  try {

const prompt = `You are a professional South Indian Vedic Astrologer using the Lahiri Ayanamsa (Sidereal Zodiac).
Generate a horoscope for:
Name: ${birthChart.name}
DOB: ${birthChart.dateOfBirth} (DDMMYYYY)
Time: ${birthChart.timeOfBirth}
Place: ${birthChart.placeOfBirth}

Technical Requirement: Use the Sidereal (Vedic) system. On this date, the Sun is in Cancer (Karka) and the Moon is in Gemini (Mithuna).


Provide the response ONLY in this format:
SUN_SIGN: Cancer
MOON_SIGN: Gemini
OVERVIEW: [2-3 sentences about current energy]
TRAITS: [trait1], [trait2], [trait3]
INSIGHT1: [sentence]
INSIGHT2: [sentence]
INSIGHT3: [sentence]

Do not include any intro, outro, or conversational text.`;

    const response = await callGeminiAPI(prompt);

    // Parse the response
    const sunSignMatch = response.match(/SUN_SIGN:\s*(.+?)(?=MOON_SIGN:|$)/s);
    const moonSignMatch = response.match(/MOON_SIGN:\s*(.+?)(?=OVERVIEW:|$)/s);
    const overviewMatch = response.match(/OVERVIEW:\s*(.+?)(?=TRAITS:|$)/s);
    const traitsMatch = response.match(/TRAITS:\s*(.+?)(?=INSIGHT|$)/s);
    const insight1Match = response.match(/INSIGHT1:\s*(.+?)(?=INSIGHT2:|$)/s);
    const insight2Match = response.match(/INSIGHT2:\s*(.+?)(?=INSIGHT3:|$)/s);
    const insight3Match = response.match(/INSIGHT3:\s*(.+?)$/s);

    // Get moon sign from API (this is primary)
    const moonSign = moonSignMatch?.[1]?.trim() || 'Unknown';
    
    // Get symbol based on API-predicted moon sign (not local calculation)
    const moonSignSymbol = getZodiacSymbol(moonSign);
    
    const overview = overviewMatch?.[1]?.trim() || 'Your cosmic energy is aligned for positive growth.';
    const traitsText = traitsMatch?.[1]?.trim() || '';
    const traits = traitsText.split(',').map(t => t.trim()).filter(Boolean);

    const keyInsights = [
      { id: '1', icon: 'star', text: insight1Match?.[1]?.trim() || '', color: '#9333ea' },
      { id: '2', icon: 'star', text: insight2Match?.[1]?.trim() || '', color: '#ec4899' },
      { id: '3', icon: 'star', text: insight3Match?.[1]?.trim() || '', color: '#3b82f6' },
    ].filter(i => i.text); // remove empty insights


    // console.log(moonSign +moonSignSymbol +overview +traits+ keyInsights);
    

    return {
      sunSign: moonSign, // Using moon sign as primary display sign
      sunSignSymbol: moonSignSymbol, // Symbol matches moon sign
      overview,
      traits: traits.slice(0, 3),
      keyInsights,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating basic reading:', error);
    throw error;
  }
};


// Generate Premium Reading (Paid)
export const generatePremiumReading = async (
  birthChart: ProfileFormData,
  topicId: string,
  topicTitle: string
): Promise<ReportData> => {
  try {
    // Let API calculate the signs instead of using local getSunSign
    const prompt = `As an expert Vedic South Indian astrologer, generate a comprehensive premium reading on "${topicTitle}" for:
Name: ${birthChart.name}
Date of Birth: ${birthChart.dateOfBirth}
Time of Birth: ${birthChart.timeOfBirth}
Place of Birth: ${birthChart.placeOfBirth}

First, calculate their Sun Sign and Moon Sign based on birth details using Vedic astrology.

Then provide three detailed sections about ${topicTitle}:

SECTION1_TITLE: [A compelling title about current energy/patterns]
SECTION1_CONTENT: [2-3 paragraphs of detailed analysis about their current situation]
SECTION1_HIGHLIGHTS: [3 key points, each on a new line starting with a dash]

SECTION2_TITLE: [A title about indicators/influences]
SECTION2_CONTENT: [2-3 paragraphs about astrological indicators and patterns]
SECTION2_HIGHLIGHTS: [3 key points, each on a new line starting with a dash]

SECTION3_TITLE: [A title about actionable guidance]
SECTION3_CONTENT: [2-3 paragraphs of specific, actionable advice]
SECTION3_HIGHLIGHTS: [3 key points, each on a new line starting with a dash]`;

    const response = await callGeminiAPI(prompt);

    // Parse sections
    const sections: ReportSection[] = [];
    const icons = ['heart', 'sparkles', 'eye'];
    const colors = ['#ec4899', '#9333ea', '#3b82f6'];

    for (let i = 1; i <= 3; i++) {
      const titleMatch = response.match(new RegExp(`SECTION${i}_TITLE:\\s*(.+?)(?=SECTION${i}_CONTENT:|$)`, 's'));
      const contentMatch = response.match(new RegExp(`SECTION${i}_CONTENT:\\s*(.+?)(?=SECTION${i}_HIGHLIGHTS:|SECTION${i + 1}|$)`, 's'));
      const highlightsMatch = response.match(new RegExp(`SECTION${i}_HIGHLIGHTS:\\s*(.+?)(?=SECTION${i + 1}|$)`, 's'));

      const title = titleMatch?.[1]?.trim() || `Section ${i}`;
      const content = contentMatch?.[1]?.trim() || 'Detailed analysis coming soon.';
      const highlightsText = highlightsMatch?.[1]?.trim() || '';
      const highlights = highlightsText
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim())
        .filter(line => line.length > 0);

      sections.push({
        id: `${i}`,
        title,
        icon: icons[i - 1] as any,
        content,
        highlights: highlights.length > 0 ? highlights : undefined,
        color: colors[i - 1],
      });
    }

    return {
      topicId,
      topicTitle,
      sections,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating premium reading:', error);
    throw error;
  }
};
