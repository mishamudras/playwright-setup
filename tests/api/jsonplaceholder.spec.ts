import { test, expect } from '@playwright/test';

test('GET single post returns correct data', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.userId).toBeTruthy();
  expect(body.title).toBeTruthy();
});
test('POST creates a new post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Test příspěvek',
      body: 'Obsah testovacího příspěvku',
      userId: 1,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.title).toBe('Test příspěvek');
  expect(body.id).toBeTruthy();
});
test('PATCH updates an existing post', async ({ request }) => {
  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
      data: { 
      title: 'Opravený titulek',
      body: 'Obsah testovacího příspěvku',
      userId: 1,
    },
    });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Opravený titulek');
  expect(body.id).toBeTruthy();
});
test('DELETE existing post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1' );
    expect(response.status()).toBe(200);
});
test('GET nonexistent post returns 404', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
  expect(response.status()).toBe(404);

});