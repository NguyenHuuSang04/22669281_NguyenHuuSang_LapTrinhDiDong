// services/api.ts
// Improved API layer with better error logging and payload compatibility
// NOTE: Replace BASE_URL and RESOURCE to match your mockapi project.

const BASE_URL = "https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1";
const RESOURCE = "Job"; // <-- VERIFY this with your mockapi console, change if needed
const TASKS_ENDPOINT = `${BASE_URL}/${RESOURCE}`;

type ApiJob = {
    id: string;
    Title?: string;
    title?: string;
    completed?: boolean;
    [key: string]: any;
};

export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

function fromApi(item: ApiJob): Task {
    return {
        id: String(item.id),
        title: item.Title ?? item.title ?? "",
        completed: !!item.completed,
    };
}

// Send both Title and title to be safe
function toApiPayload(payload: { title: string; completed?: boolean }) {
    return {
        Title: payload.title,
        title: payload.title,
        completed: payload.completed ?? false,
    };
}

async function handleResp(resp: Response) {
    const text = await resp.text().catch(() => "");
    let body: any = text;
    try {
        body = text ? JSON.parse(text) : text;
    } catch {
        // keep text
    }
    if (!resp.ok) {
        const err = new Error(`HTTP ${resp.status} ${resp.statusText} - ${JSON.stringify(body)}`);
        // attach body for further inspection if needed
        (err as any).body = body;
        throw err;
    }
    return body;
}

export async function fetchTasks(): Promise<Task[]> {
    try {
        const resp = await fetch(TASKS_ENDPOINT);
        const data = await handleResp(resp);
        return Array.isArray(data) ? data.map(fromApi) : [];
    } catch (error) {
        console.error("fetchTasks error", error);
        throw error;
    }
}

export async function fetchTaskById(id: string): Promise<Task | null> {
    try {
        const resp = await fetch(`${TASKS_ENDPOINT}/${id}`);
        const data = await handleResp(resp);
        return fromApi(data);
    } catch (error) {
        console.error("fetchTaskById error", error);
        throw error;
    }
}

export async function addTask(payload: { title: string }): Promise<Task> {
    try {
        const body = toApiPayload({ title: payload.title, completed: false });
        const resp = await fetch(TASKS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const json = await handleResp(resp);
        return fromApi(json);
    } catch (error) {
        console.error("addTask error", error);
        throw error;
    }
}

export async function updateTask(id: string, payload: { title?: string; completed?: boolean }): Promise<Task> {
    try {
        const body = toApiPayload({ title: payload.title ?? "", completed: payload.completed });
        const resp = await fetch(`${TASKS_ENDPOINT}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const json = await handleResp(resp);
        return fromApi(json);
    } catch (error) {
        console.error("updateTask error", error);
        throw error;
    }
}

export async function toggleTaskComplete(id: string): Promise<Task> {
    try {
        const respGet = await fetch(`${TASKS_ENDPOINT}/${id}`);
        const item = await handleResp(respGet);
        const updatedBody = {
            ...item,
            completed: !item.completed,
            Title: item.Title ?? item.title,
            title: item.Title ?? item.title,
        };
        const resp = await fetch(`${TASKS_ENDPOINT}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBody),
        });
        const json = await handleResp(resp);
        return fromApi(json);
    } catch (error) {
        console.error("toggleTaskComplete error", error);
        throw error;
    }
}

export async function deleteTask(id: string): Promise<void> {
    try {
        const resp = await fetch(`${TASKS_ENDPOINT}/${id}`, {
            method: "DELETE",
        });
        await handleResp(resp);
        return;
    } catch (error) {
        console.error("deleteTask error", error);
        throw error;
    }
}