import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getChat (chatId) {
    return supabaseClient
        .from('chat')
            .select('*')
            .filter('id', 'in', `(${chatId})`)
            .order('id', {ascending: false})
        .then(({ data }) => data.length ? data[0] : null)
        .catch(() => null);
}

async function getChats () {
    return supabaseClient
        .from('chat')
            .select('*')
            .order('id', {ascending: false})
        .then(({ data }) => data)
        .catch(() => []);
}

function getMessagesByChat (chatId) {
    return supabaseClient
        .from('messages')
            .select('*')
            .filter('chat_id', 'in', `(${chatId})`)
            .order('id', {ascending: false})
        .then(({data}) => data)
        .catch(() => []);
}

async function saveChat (payload) {
    console.log('saveChat');
    return supabaseClient
        .from('chat')
        .insert([ payload ])
        .then(({ data }) => data.length ? data[0] : null)
        .catch(() => null)
}

async function saveMessage (payload) {
    return supabaseClient
        .from('messages')
        .insert([ payload ])
        .then(({ data }) => {
            console.log('Insert message data', data);
        })
}

function subscribeChats (addChat) {
    return supabaseClient
        .from('chat')
        .on('INSERT', (response) => addChat(response.new))
        .subscribe();
}

function subscribeMessagesByChat (chatId, addMessage) {
    return supabaseClient
        .from(`messages:chat_id=eq.${chatId}`)
        .on('INSERT', (response) => addMessage(response.new))
        .subscribe()
}

export {
    supabaseClient,
    getChat,
    getChats,
    getMessagesByChat,
    saveChat,
    saveMessage,
    subscribeChats,
    subscribeMessagesByChat
}
