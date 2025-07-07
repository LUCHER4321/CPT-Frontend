import { useEffect, useState } from 'react'
import { HomeNavBar } from './components/HomeNavBar'
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import type { PhTreeResponse } from './types';
import { searchTrees } from './api/phTree';
import { Order, TreeCriteria } from './enums';
import { getUser } from './api/user';
import { exampleTrees, exampleUsers } from './data/example';
import { TopTrees } from './components/TopTrees';

function App() {
  const [open, setOpen] = useState(false);
  const [trees, setTrees] = useState<(PhTreeResponse & { username: string })[]>([]);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const remoteTrees = await searchTrees({
          limit: 3,
          criteria: TreeCriteria.POPULARITY,
          order: Order.DESC
        }).catch(() => {
          throw new Error("Failed to fetch trees");
        });
        if(!remoteTrees) throw new Error("Failed to fetch trees");
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
