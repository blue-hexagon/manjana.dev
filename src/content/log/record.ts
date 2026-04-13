export type Category =
    | "Python"
    | "Networking"
    | "Concurrency"
    | "Containers"
    | "Cryptogtaphy"
    | "Protocols"
    | "Routing & Switching"
    | "Design Patterns"

export type EntryType =
    | "pattern"
    | "pitfall"
    | "diagnostic"
    | "trick"
    | "mental-model"

export interface KnowledgeEntry {
    id: string
    timestamp: string
    category: Category
    type: EntryType
    difficulty?: "basic" | "intermediate" | "deep"
    title: string
    summary: string
    codeBlocks?: {
        label: string
        language: string
        code: string
        note?: string
    }[]

    explanation?: string
    notes?: string
    gotchas?: string

    tags?: string[]
    reference?: string
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
    "python-singleton": {
        id: "python-singleton",
        timestamp: "2026-04-13 17:00 CET",
        category: "Python",
        type: "pitfall",

        title: "The Singleton is a Lie 🍰",

        summary:
            "Singleton is an anti-pattern that comes with a lot of drawback despite seeming like a good solution",

        codeBlocks: [
            {
                label: "Singleton Metaclass",
                language: "python",
                code: `
class Singleton(type):
    """ Usage: class ClassName(metaclass=Singleton) """

    _instances = {}

    def __call__(cls, *args, **kwargs) -> Any:
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]
`
            },
            {
                label: "Borg Variant",
                language: "python",
                code: `
class Singleton:
    _state = {} # Using a class-variable makes it persist (shared) across object instances
    def __init__(self):
        self.__dict__ = self._state
`
            },
            {
                label: "Module-backed Singleton",
                language: "python",
                code: `
class Config:
    def __init__(self):
        self.state: Union[Dict[str,Any],Bool] = False  # Don't mind the typehint..

import_this = Config()

#---------------------------------------------------

from config import import_this as config

if not config.state:
    print("This is the most Pythonic (recommended) implementation")
`
            },
            {
                label: "Pythons Builtin Logger (Multiton)",
                language: "python",
                code: `
import logging

_logger = logging.getLogger("app") # This is actually a registry-backed Multiton and ain't that bad 

def get_logger():
    return _logger

""" Use by importing the get_logger function """
                `
            }
        ],

        explanation:
            "Singleton enforces uniqueness by controlling instantiation.\n" +
            "\n" +
            "Python achieves the same effect more naturally by controlling module identity through the import system.\n" +
            "\n" +
            "This makes explicit Singleton patterns redundant in most cases." +
            "\n" +
            "\n" +
            "Singletons are typically an anti-pattern and adds hidden state, tight coupling and makes testability difficult. Moreover they introduce state that is hard to reason about because it can be mutated by anyone and tend to accumulate technical debt over time.\n\n" +
            "Singleton is almost never the right answer, except in rare cases where you fully understand and consciously accept the tradeoffs.",

        notes:
            "Singletons are a legacy pattern that solve a problem Python does not have.\n" +
            "\n" +
            "In Python, modules are loaded once and cached in sys.modules, meaning any object defined at module scope is already a process-wide singleton.\n" +
            "\n" +
            "Attempting to reintroduce Singleton patterns through metaclasses or class control adds unnecessary complexity while introducing hidden state, tight coupling, and poor testability.\n" +
            "\n" +
            "Most Singleton use-cases in Python are better solved with:\n" +
            "- module-level instances\n" +
            "- dependency injection\n" +
            "- explicit lifecycle management\n" +
            "\n" +
            "As systems grow, Singleton-based designs tend to degrade into implicit, globally shared state that becomes difficult to reason about, test, and evolve.",
        gotchas: "" +
            "Real-world failure modes:\n" +
            "\n" +
            "- Tests leak state between runs because the Singleton persists\n" +
            "- Multiprocessing creates multiple “singletons” (one per process)\n" +
            "- Hidden mutations from different parts of the system cause non-deterministic bugs\n" +
            "- Refactoring becomes difficult because dependencies are implicit",
        tags: ["python", "design pattern"],
    },

    "python-properties": {
        id: "python-properties",
        timestamp: "2026-04-12 10:00 CET",
        category: "Python",
        type: "pattern",

        title: "Python Property Decorator",

        summary:
            "The property decorator lets you use variables as getters and setters",

        codeBlocks: [
            {
                language: "python",
                label: "Python Properties",
                code: `
class Employee:

    def __init__(self, first, last):
        self.first = first
        self.last = last

    @property
    def email(self):
        return '{}.{}@email.com'.format(self.first, self.last)

    @property
    def fullname(self):
        return '{} {}'.format(self.first, self.last)
    
    @fullname.setter
    def fullname(self, name):
        first, last = name.split(' ')
        self.first = first
        self.last = last
    
    @fullname.deleter
    def fullname(self):
        print('Delete Name!')
        self.first = None
        self.last = None

if __name__ == '__main__':
    emp = Employee('John', 'Smith')
    del emp.fullname
    emp.fullname = "Corey Schafer"
    
    print(emp.first)
    print(emp.email)
    print(emp.fullname)
`
            }
        ],

        explanation:
            "The @property decorator turns a method into a computed attribute, allowing you to access it like a field while still executing logic. This creates a stable public interface while keeping internal representation flexible.\n\nProperties are primarily used to enforce invariants, derive values, or introduce lazy computation without changing how the object is consumed.\n\nIn this example:\n- email is dynamically computed from first/last\n- fullname acts as a virtual field with getter, setter, and deleter\n\nThis allows external code to treat fullname like a normal attribute, while internally it updates first/last.\n\nKey insight: properties decouple *API surface* from *internal state*.",

        notes:
            "Use properties when:\n- You need backward compatibility while refactoring internals\n- You want validation or transformation on assignment\n- You want derived/computed attributes\n\nAvoid when:\n- The operation is expensive (properties should feel cheap)\n- Side effects are non-obvious (can confuse users)\n\nAdvanced:\n- Properties are descriptors under the hood\n- Can be combined with caching (functools.cached_property)\n- Overuse can hide complexity and make debugging harder",

        gotchas:
            "Setter/deleter must match the property name exactly\n- Infinite recursion if you reference the property inside itself\n- No arguments allowed on property access\n- Debugging can be harder since it looks like a field but behaves like a method",

        tags: ["python", "bultin"],
    },

    "visitor-pattern": {
        id: "visitor-pattern",
        timestamp: "2026-04-12 10:30 CET",
        category: "Design Patterns",
        type: "pattern",

        title: "Visitor Pattern (Double Dispatch)",

        summary:
            "Separate operations from object structures by externalizing behavior into visitor objects.",

        codeBlocks: [
            {
                language: "csharp",
                label: "",
                code: `
public abstract class Pastry
{
    public abstract string Description { get; }
    public abstract int KiloCalories { get; }
    public abstract float Price { get; }
    public abstract string Name { get; }
    public abstract void Accept(IPastryVisitor visitor);
}

public class Beignet : Pastry
{
    public override string Description => "A French pastry made from deep-fried dough, typically dusted with powdered sugar.";
    public override int KiloCalories => 250;
    public override float Price => 2.5f;
    public override string Name => "Beignet";

    public Beignet()
    {
    }

    public override void Accept(IPastryVisitor visitor)
    {
        visitor.Visit(this);
    }
}

public class Cruller : Pastry
{
    public override string Description => "A twisted, sweet pastry made from yeast dough that is deep-fried and often glazed.";
    public override int KiloCalories => 220;
    public override float Price => 1.75f;
    public override string Name => "Cruller";

    public Cruller()
    {
    }

    public override void Accept(IPastryVisitor visitor)
    {
        visitor.Visit(this);
    }
}

public interface IPastryVisitor
{
    void Visit(Beignet beignet);
    void Visit(Cruller cruller);
}

public class PastryInspector : IPastryVisitor
{
    public void Visit(Beignet beignet)
    {
        Console.WriteLine($"This Beignet costs {beignet.Price} and has {beignet.KiloCalories} kcal");
    }

    public void Visit(Cruller cruller)
    {
        Console.WriteLine($"This Cruller costs {cruller.Price} and has {cruller.KiloCalories} kcal");
    }
}

public class PastryReviewer : IPastryVisitor
{
    private List<string> RatingInspectionIncrementors = new()
    {
        "sweet", "deep-fried", "glazed", "sugar"
    };

    private void Rate(Pastry pastry)
    {
        var stars = 0;
        foreach (var ratingIncrementor in RatingInspectionIncrementors)
        {
            if (pastry.Description.Contains(ratingIncrementor))
            {
                stars += 1;
            }
        }

        Console.WriteLine($"This {pastry.Name} gets {new string('*', stars)} stars!");
    }

    public void Visit(Beignet beignet)
    {
        Rate(beignet);
    }

    public void Visit(Cruller cruller)
    {
        Rate(cruller);
    }
}

public static class Runner
{
    public static void Run()
    {
        List<Pastry> pastries = new List<Pastry>()
        {
            new Beignet(),
            new Cruller()
        };
        List<IPastryVisitor> visitors = new List<IPastryVisitor>()
        {
            new PastryReviewer(),
            new PastryInspector()
        };

        foreach (var pastry in pastries)
        {
            foreach (var visitor in visitors)
            {
                pastry.Accept(visitor);
            }
        }
        /*
           This Beignet gets ** stars!
           This Beignet costs 2,5 and has 250 kcal
           This Cruller gets *** stars!
           This Cruller costs 1,75 and has 220 kcal
         */
    }
}                
                `
            }
        ],

        explanation:
            "The Visitor Pattern allows you to define new operations on a set of objects without modifying their classes. Each object exposes an Accept(visitor) method, which calls back into the visitor with its concrete type (visitor.Visit(this)). This enables double dispatch.",

        notes:
            "Best used when object structure is stable and rarely changes.",

        gotchas:
            "Adds complexity and tight coupling between visitors and object types.",

        tags: ["design-pattern", "visitor", "oop", "double-dispatch"]
    },

    "threadpool-result-mapping": {
        id: "threadpool-result-mapping",
        timestamp: "2026-04-09 19:00 CET",
        category: "Concurrency",
        type: "pattern",

        title: "ThreadPoolExecutor Result Mapping",

        summary:
            "Return the input value from workers so results can be mapped to tasks when using as_completed.",

        codeBlocks: [
            {
                language: "python",
                label: "",
                code: `
from concurrent.futures import ThreadPoolExecutor, as_completed

def worker(ip):
    return ip, ping(ip)

with ThreadPoolExecutor(max_workers=20) as pool:
    futures = [pool.submit(worker, ip) for ip in ips]

    for f in as_completed(futures):
        ip, result = f.result()
        print(ip, result)
`
            }
        ],

        explanation:
            "executor.map() hides which input produced which result. Returning the input preserves context.",

        notes:
            "Useful for scanners, distributed jobs, and network automation.",

        tags: ["python", "threadpool", "concurrency"],
    },

    "ipv4-sort": {
        id: "ipv4-sort",
        timestamp: "2026-04-09 18:10 CET",
        category: "Python",
        type: "pattern",

        title: "Correct IPv4 Sorting",

        summary:
            "String sorting produces incorrect ordering of IPv4 addresses. Convert to numeric tuples.",

        codeBlocks: [
            {
                language: "python",
                label: "",
                code: `
sorted(ips, key=lambda ip: tuple(map(int, ip.split("."))))
`
            }
        ],

        explanation:
            "Lexicographic sorting treats numbers as text. Converting to numeric tuples restores correct ordering.",

        notes:
            "Works well for CLI tools and automation scripts.",

        tags: ["python", "ip", "sorting"],
    },

    "regex-catastrophic-backtracking": {
        id: "regex-catastrophic-backtracking",
        timestamp: "2026-04-09 17:30 CET",
        category: "Python",
        type: "pitfall",

        title: "Regex Catastrophic Backtracking",

        summary:
            "Nested quantifiers can cause exponential regex execution time.",

        codeBlocks: [
            {
                language: "python",
                label: "Catasprophic Backtracking",
                code: `
import re

re.match(r"(a+)+b", "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
`
            }
        ],

        explanation:
            "The regex engine attempts huge numbers of backtracking combinations when nested quantifiers are present.",

        gotchas:
            "Avoid nested greedy quantifiers. Prefer explicit repetition or atomic groups.",

        tags: ["regex", "performance", "pitfall"],
    },

    "netmiko-threadpool": {
        id: "netmiko-threadpool",
        timestamp: "2026-04-09 16:40 CET",
        category: "Networking",
        type: "pattern",

        title: "Parallel Netmiko SSH Execution",

        summary:
            "Use ThreadPoolExecutor to run Netmiko commands across many devices concurrently.",

        codeBlocks: [
            {
                language: "python",
                label: "Using ThreadPoolExecutor for concurrency",
                code: `
from concurrent.futures import ThreadPoolExecutor
from netmiko import ConnectHandler

def run_command(device):
    conn = ConnectHandler(**device)
    return conn.send_command("show version")

with ThreadPoolExecutor(max_workers=20) as pool:
    results = list(pool.map(run_command, devices))
`
            }
        ],

        explanation:
            "SSH operations are IO-bound. Threads scale well because they wait on network IO rather than CPU.",

        notes:
            "Avoid very large worker counts or network devices may throttle SSH sessions.",

        tags: ["netmiko", "ssh", "automation"],
    },
}