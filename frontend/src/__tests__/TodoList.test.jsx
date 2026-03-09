import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest'
import TodoList from '../TodoList.jsx'

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));
import { useAuth } from '../context/AuthContext';

const mockResponse = (body, ok = true) =>
    Promise.resolve({
        ok,
        json: () => Promise.resolve(body),
    });

const todoItem1 = { id: 1, title: 'First todo', done: false, comments: [] };
const todoItem2 = { id: 2, title: 'Second todo', done: false, comments: [] };
const originalTodoList = [todoItem1, todoItem2];

describe('TodoList', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        useAuth.mockReturnValue({
            username: 'testuser',
            accessToken: 'fake-token',
            login: vi.fn(),
            logout: vi.fn(),
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.unstubAllGlobals();
    });

    it('renders correctly', async () => {
        global.fetch.mockImplementationOnce(() => mockResponse(originalTodoList));
        render(<TodoList apiUrl="http://localhost:5000/api/todos/" />);
        expect(await screen.findByText('First todo')).toBeInTheDocument();
    });

    it('toggles done on a todo item', async () => {
        const toggledTodoItem1 = { ...todoItem1, done: true };
        global.fetch.mockImplementation((url, options) => {
            if (options && options.method === 'PATCH') return mockResponse(toggledTodoItem1);
            return mockResponse(originalTodoList);
        });

        render(<TodoList apiUrl="http://localhost:5000/api/todos/" />);
        const toggleButtons = await screen.findAllByRole('button', { name: /toggle/i });
        toggleButtons[0].click();

        await waitFor(() => {
            expect(screen.getByText('First todo')).toHaveClass('done');
        });

        expect(global.fetch).toHaveBeenLastCalledWith(
            expect.stringMatching(/1\/toggle/),
            expect.anything()
        );
    });
});