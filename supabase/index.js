import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getChat (chatId) {
    return supabaseClient
        .from('chat')
            .select('*')
            .eq('chat.id', chatId)
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

function saveChat (payload) {
    return supabaseClient
        .from('chat')
        .insert([ payload ])
        .then(({ data }) => {
            console.log('Insert chat data', data);
        })
}

function saveMessage (payload) {
    return supabaseClient
        .from('messages')
        .insert([ payload ])
        .then(({ data }) => {
            console.log('Insert message data', data);
        })
}

function subscribeChats () {
    return supabaseClient
        .from('chat')
        .on('INSERT', () => console.log('Houve um insert no chat'))
        .subscribe()
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
