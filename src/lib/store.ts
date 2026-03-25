export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
}

// In-memory store (resets on server restart)
let posts: Post[] = [
  {
    id: 1,
    title: "Next.js 게시판에 오신 것을 환영합니다!",
    author: "관리자",
    content: "이 게시판은 Next.js와 Tailwind CSS로 만들어졌습니다.\n\n자유롭게 글을 작성하고 소통해 보세요.",
    createdAt: new Date().toISOString(),
    views: 0,
  },
  {
    id: 2,
    title: "게시판 이용 안내",
    author: "관리자",
    content: "1. 글쓰기 버튼을 눌러 새 글을 작성할 수 있습니다.\n2. 제목을 클릭하면 상세 내용을 볼 수 있습니다.\n3. 게시글 수정 및 삭제가 가능합니다.",
    createdAt: new Date(Date.now() - 60000).toISOString(),
    views: 0,
  },
];

let nextId = 3;

export function getPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPost(id: number): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function createPost(data: Omit<Post, "id" | "createdAt" | "views">): Post {
  const post: Post = {
    id: nextId++,
    ...data,
    createdAt: new Date().toISOString(),
    views: 0,
  };
  posts.push(post);
  return post;
}

export function updatePost(id: number, data: Partial<Omit<Post, "id" | "createdAt" | "views">>): Post | null {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data };
  return posts[idx];
}

export function deletePost(id: number): boolean {
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  return true;
}

export function incrementViews(id: number): void {
  const post = posts.find((p) => p.id === id);
  if (post) post.views++;
}
