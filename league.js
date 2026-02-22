import { db } from './config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Fungsi Tambah Tim (Hanya Admin)
export const addTeam = async (teamName) => {
    try {
        const docRef = await addDoc(collection(db, "teams"), {
            name: teamName,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0
        });
        return docRef.id;
    } catch (e) {
        throw e;
    }
};

// 2. Algoritma Round Robin (Penjadwalan Otomatis)
export const generateSchedule = (teams) => {
    let schedule = [];
    if (teams.length % 2 !== 0) {
        teams.push({ name: "BYE (Istirahat)", isBye: true });
    }

    const rounds = teams.length - 1;
    const half = teams.length / 2;

    for (let r = 0; r < rounds; r++) {
        let roundMatches = [];
        for (let i = 0; i < half; i++) {
            const home = teams[i];
            const away = teams[teams.length - 1 - i];
            if (!home.isBye && !away.isBye) {
                roundMatches.push({ home: home.name, away: away.name, round: r + 1 });
            }
        }
        // Rotasi tim (sisakan satu di posisi tetap)
        teams.splice(1, 0, teams.pop());
        schedule.push(...roundMatches);
    }
    return schedule;
};
