
n, m = list(map(int,input().split()))

edges = []

for i in range(m):
    edges.append(list(map(int,input().split())))
    edges[i][0] -= 1
    edges[i][1] -= 1

edges.sort(key=lambda edge: edge[2])

used = set()

graph = list(map(lambda x: [], [None] * n))
weight = 0

def hasCycle(G):
    has = False
    def help(v = 0, visited = set()):
        print(v)
        if (v in visited):
            nonlocal has
            has = True
            return
        visited.add(v)
        for u in G[v]:
            help(u, visited)
    help()
    return has

for i in range(m):
    edge = edges[i]
    if len(used) == n:
        break
    if not (edge[0] in used and edge[1] in used):
        used.add(edge[0])
        used.add(edge[1])
        weight += edge[2]
        graph[edge[0]].append(edge[1])
    else:
        graph[edge[0]].append(edge[1])

        if not hasCycle(graph):
            used.add(edge[0])
            used.add(edge[1])
            weight += edge[2]
        else:
            graph[edge[0]].pop()





print(weight)

print(graph)


