import { useEffect, useState } from 'react'
import { HomeNavBar } from './components/home/HomeNavBar'
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import type { UserResponse, PhTreeResponse } from './types';
import { searchTrees } from './api/phTree';
import { Order, TreeCriteria } from './enums';
import { getMe, getUser } from './api/user';
import { exampleTrees, exampleUsers } from './data/example';
import { TopTrees } from './components/home/TopTrees';

function App() {
  const [open, setOpen] = useState(false);
  const [trees, setTrees] = useState<(PhTreeResponse & { username: string })[]>([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<UserResponse | undefined>();

  useEffect(() => {
    document.title = "Life Tree | Create Phylogenetic Trees";
    getMe({}).then(setUser);
    const fetchTrees = async () => {
      try {
        const remote = await searchTrees({
          limit: 3,
          criteria: TreeCriteria.POPULARITY,
          order: Order.DESC
        }).catch(() => {
          throw new Error("Failed to fetch trees");
        });
        if(!remote) throw new Error("Failed to fetch trees");
        const remoteTrees = remote.trees;
        const remoteUsers = await Promise.all(
          remoteTrees?.map(t => getUser({ id: t.userId })) ?? []
        );
        setTrees(
          remoteTrees?.map(t => ({
            ...t,
            username: remoteUsers.find(u => u?.id === t.userId)?.username ?? ""
          })) ?? []
        );
      } catch {
        setTrees(
          exampleTrees.slice(0, 3).map(t => ({
            ...t,
            username: exampleUsers.find(u => u.id === t.userId)?.username ?? ""
          })) ?? []
        );
      }
    };
    fetchTrees();
  }, []);

  return (
    <>
      <HomeNavBar
        open={open}
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
        user={user}
      />
      <Hero
        hrefStart="/auth?register=true"
        hrefInfo="/#features"
      />
      <Features id="features"/>
      <TopTrees
        id="top-trees"
        trees={trees}
      />
    </>
  )
}

export default App
