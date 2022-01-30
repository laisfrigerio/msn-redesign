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
            .eq('messages.chat_id', chatId)
            .order('id', {ascending: false})
        .then(({data}) => data)
        .catch(() => []);
}

function saveMessage (payload) {
    supabaseClient
        .from('messages')
        .insert([ payload ])
        .then(({ data })=> console.log(data))
}

export {
    supabaseClient,
    getChat,
    getChats,
    getMessagesByChat,
    saveMessage
}
