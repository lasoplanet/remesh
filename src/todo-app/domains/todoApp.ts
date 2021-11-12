import { map } from 'rxjs/operators';
import { Remesh } from '../../remesh';

import { TodoInputDomain } from './todoInput';
import { TodoFilterDomain } from './todoFilter';
import { TodoListDomain } from './todoList';
import { merge, of } from 'rxjs';

import type { Todo } from './todoList';

export type { Todo };

const TodoAppHeaderWidget = Remesh.widget((domain) => {
  const todoInputDomain = domain.get(TodoInputDomain);
  const todoListDomain = domain.get(TodoListDomain);

  domain.command$({
    name: 'TodoHeaderTask',
    impl: ({ fromEvent }) => {
      const clearTodoInput$ = fromEvent(
        todoListDomain.event.AddTodoSuccessEvent
      ).pipe(map(() => todoInputDomain.command.updateTodoInput('')));

      return merge(clearTodoInput$);
    },
  });

  return {
    query: {
      IsAllCompletedQuery: todoListDomain.query.IsAllCompletedQuery,
      ...todoInputDomain.query,
    },
    command: {
      updateTodoInput: todoInputDomain.command.updateTodoInput,
      addTodo: todoListDomain.command.addTodo,
      toggleAllTodos: todoListDomain.command.toggleAllTodos,
    },
    event: {
      AddTodoFailedEvent: todoListDomain.event.AddTodoFailedEvent,
      AddTodoSuccessEvent: todoListDomain.event.AddTodoSuccessEvent,
    }
  };
});

const TodoAppMainWidget = Remesh.widget((domain) => {
  const todoInputDomain = domain.get(TodoInputDomain);
  const todoFilterDomain = domain.get(TodoFilterDomain);
  const todoListDomain = domain.get(TodoListDomain);

  const TodoFilteredListQuery = domain.query({
    name: 'TodoFilteredListQuery',
    impl: ({ get }) => {
      const todoList = get(todoListDomain.query.TodoListQuery());
      const todoSortedList = get(todoListDomain.query.TodoSortedListQuery());
      const todoFilter = get(todoFilterDomain.query.TodoFilterQuery());

      if (todoFilter === 'active') {
        return todoSortedList.activeTodoList;
      }

      if (todoFilter === 'completed') {
        return todoSortedList.completedTodoList;
      }

      return todoList;
    },
  });

  const TodoMatchedListQuery = domain.query({
    name: 'TodoMatchedListQuery',
    impl: ({ get }) => {
      const todoFilteredList = get(TodoFilteredListQuery());
      const todoInput = get(todoInputDomain.query.TodoInputQuery());

      if (todoInput.length === 0) {
        return todoFilteredList;
      }

      const todoMatchedList = todoFilteredList.filter((todo) => {
        return todo.content.includes(todoInput);
      });

      return todoMatchedList;
    },
  });

  const TodoMatchedKeyListQuery = domain.query({
    name: 'TodoMatchedKeyListQuery',
    impl: ({ get }) => {
      return get(TodoMatchedListQuery()).map((todo) => todo.id);
    },
  });

  return {
    query: {
      ...todoListDomain.query,
      TodoMatchedListQuery,
      TodoFilteredListQuery,
      TodoMatchedKeyListQuery,
    },
    command: {
      ...todoListDomain.command,
    },
  };
});

const TodoAppFooterWidget = Remesh.widget((domain) => {
  const todoFilterDomain = domain.get(TodoFilterDomain);
  const todoListDomain = domain.get(TodoListDomain);

  return {
    query: {
      TodoItemLeftCountQuery: todoListDomain.query.TodoItemLeftCountQuery,
      ...todoFilterDomain.query,
    },
    command: {
      ...todoFilterDomain.command,
    },
  };
});

export const TodoAppHeaderDomain = Remesh.domain({
  name: 'TodoAppHeaderDomain',
  impl: (domain) => {
    const header = domain.use(TodoAppHeaderWidget());
    return {
      query: {
        ...header.query,
      },
      command: {
        ...header.command,
      },
      event: {
        ...header.event,
      }
    };
  },
});

export const TodoAppMainDomain = Remesh.domain({
  name: 'TodoAppMainDomain',
  impl: (domain) => {
    const main = domain.use(TodoAppMainWidget());
    return {
      query: {
        ...main.query,
      },
      command: {
        ...main.command,
      },
    };
  },
});

export const TodoAppFooterDomain = Remesh.domain({
  name: 'TodoAppFooterDomain',
  impl: (domain) => {
    const footer = domain.use(TodoAppFooterWidget());
    return {
      query: {
        ...footer.query,
      },
      command: {
        ...footer.command,
      },
    };
  },
});