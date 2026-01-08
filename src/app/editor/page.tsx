"use client";
import React, { useState, useRef, JSX } from 'react';
import { 
  FaNetworkWired, 
  FaShieldVirus, 
  FaJava, 
  FaMobile, 
  FaGavel, 
  FaChartGantt, 
  FaRobot,
  FaPlus,
  
  FaTrash,
  
  FaUpload,
  FaDownload,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa6";
import {
FaSave,
FaEdit,
} from "react-icons/fa"
import { PiNumberSquareFiveBold, PiNumberSquareFourBold, PiNumberSquareThreeBold } from "react-icons/pi";

// Type definitions
interface Source {
  url: string;
  type: 'local' | 'remote';
}

interface Lecture {
  id: string;
  weight: number;
  title: string;
  type: string;
  source: Source;
}

interface Module {
  id: string;
  name: string;
  title: string;
  slug: string;
  front_page: string;
  lectures: Lecture[];
}

interface Year {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  mods: Module[];
}

interface Subject {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  years: Year[];
}

interface Social {
  Github: string | null;
  Bluesky: string | null;
  Linkedin: string | null;
  Email: string | null;
  Youtube: string | null;
  StackOverflow: string | null;
}

interface AppData {
  Author: string;
  Social: Social;
  Subjects: Subject[];
}

interface EditingItem {
  item: any;
  path: string;
}

type ItemType = 'subject' | 'year' | 'mod' | 'lecture';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaNetworkWired,
  FaShieldVirus,
  FaJava,
  FaMobile,
  FaGavel,
  FaChartGantt,
  FaRobot,
  PiNumberSquareFiveBold,
  PiNumberSquareFourBold,
  PiNumberSquareThreeBold
};

const initialData: AppData = {
  Author: "Prof. Schimd",
  Social: {
    Github: "ProfSchimd",
    Bluesky: "profschimd.bsky.social",
    Linkedin: null,
    Email: null,
    Youtube: null,
    StackOverflow: "18081937",
  },
  Subjects: [
    {
      id: "inf",
      title: "Informatica",
      description: "Programmazione nativa e web, sia frontend che backend con progettazione Database.",
      slug: "/materie/inf",
      icon: "FaJava",
      years: [
        {
          id: "3",
          title: "Terzo Anno",
          description: "Programmazione nativa, paradigma di programmazione ad oggetti.",
          icon: "PiNumberSquareThreeBold",
          slug: "/materie/inf/3/",
          mods: []
        },
        {
          id: "4",
          title: "Quarto Anno",
          description: "Strutture dati e programmazione web frontend.",
          icon: "PiNumberSquareFourBold",
          slug: "/materie/inf/4/",
          mods: []
        },
        {
          id: "5",
          title: "Quinto Anno",
          description: "Progettazione di database e sviluppo backend.",
          icon: "PiNumberSquareFiveBold",
          slug: "/materie/inf/5/",
          mods: []
        },
      ]
    },
    {
      id: "sr",
      title: "Sistemi e Reti",
      description: "Sistemi embedded per l'Internet of Things. Reti e progettazione con particolare riferimento alla cybersecurity",
      slug: "/materie/sr",
      icon: "FaNetworkWired",
      years: [
        {
          id: "3",
          title: "Terzo Anno",
          description: "Sistemi di elaborazione e fondamenti di reti.",
          icon: "PiNumberSquareThreeBold",
          slug: "/materie/sr/3/",
          mods: []
        },
        {
          id: "4",
          title: "Quarto Anno",
          description: "Modelli per reti e configurazione reti locali.",
          icon: "PiNumberSquareFourBold",
          slug: "/materie/sr/4/",
          mods: [
            {
              id: "SR.4.01",
              name: "Physical",
              title: "Livello Fisico",
              slug: "/materie/sr/4/SR.4.01",
              front_page: "README.md",
              lectures: []
            },
            {
              id: "SR.4.02",
              name: "Data Link",
              title: "Livello di Collegamento",
              slug: "/materie/sr/4/SR.4.02",
              front_page: "README.md",
              lectures: []
            },
            {
              id: "SR.4.03",
              name: "Network",
              title: "Livello di Rete",
              slug: "/materie/sr/4/SR.4.03",
              front_page: "README.md",
              lectures: [
                {
                  id: "L01",
                  weight: 10,
                  title: "Ruoli del livello di Rete",
                  type: "lecture",
                  source: {
                    url: "L01_NetRole.md",
                    type: "local"
                  }
                },
                {
                  id: "L02",
                  weight: 20,
                  title: "Protocolli del livello di Rete",
                  type: "lecture",
                  source: {
                    url: "https://www. ... /ip.md",
                    type: "remote"
                  }
                }
              ]
            }
          ]
        },
        {
          id: "5",
          title: "Quinto Anno",
          description: "Progettazione reti e sicurezza dei sistemi.",
          icon: "PiNumberSquareFiveBold",
          slug: "/materie/sr/5/",
          mods: []
        },
      ]
    }
  ]
};

const SubjectsManager: React.FC = () => {
  const [data, setData] = useState<AppData>(initialData);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleExpanded = (nodeId: string): void => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const startEdit = (item: any, path: string): void => {
    setEditingItem({ item, path });
    setEditForm({ ...item });
  };

  const saveEdit = (): void => {
    if (!editingItem) return;
    
    const newData = { ...data };
    const pathArray = editingItem.path.split('.');
    
    let current: any = newData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (pathArray[i] === 'Subjects') {
        current = current.Subjects;
      } else if (!isNaN(Number(pathArray[i]))) {
        current = current[parseInt(pathArray[i])];
      } else {
        current = current[pathArray[i]];
      }
    }
    
    const lastKey = pathArray[pathArray.length - 1];
    if (!isNaN(Number(lastKey))) {
      current[parseInt(lastKey)] = editForm;
    } else {
      current[lastKey] = editForm;
    }
    
    setData(newData);
    setEditingItem(null);
    setEditForm({});
  };

  const cancelEdit = (): void => {
    setEditingItem(null);
    setEditForm({});
  };

  const deleteItem = (path: string): void => {
    const newData = { ...data };
    const pathArray = path.split('.');
    
    let current: any = newData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (pathArray[i] === 'Subjects') {
        current = current.Subjects;
      } else if (!isNaN(Number(pathArray[i]))) {
        current = current[parseInt(pathArray[i])];
      } else {
        current = current[pathArray[i]];
      }
    }
    
    const lastKey = pathArray[pathArray.length - 1];
    if (Array.isArray(current) && !isNaN(Number(lastKey))) {
      current.splice(parseInt(lastKey), 1);
    } else {
      delete current[lastKey];
    }
    
    setData(newData);
  };

  const addItem = (parentPath: string, itemType: ItemType): void => {
    const newData = { ...data };
    let current: any = newData;
    
    if (parentPath) {
      const pathArray = parentPath.split('.');
      for (const key of pathArray) {
        if (key === 'Subjects') {
          current = current.Subjects;
        } else if (!isNaN(Number(key))) {
          current = current[parseInt(key)];
        } else {
          current = current[key];
        }
      }
    }

    let newItem: Subject | Year | Module | Lecture;
    switch (itemType) {
      case 'subject':
        newItem = {
          id: `new_${Date.now()}`,
          title: "New Subject",
          description: "",
          slug: "",
          icon: "FaJava",
          years: []
        };
        current.push(newItem);
        break;
      case 'year':
        newItem = {
          id: "new",
          title: "New Year",
          description: "",
          icon: "PiNumberSquareThreeBold",
          slug: "",
          mods: []
        };
        current.years.push(newItem);
        break;
      case 'mod':
        newItem = {
          id: `new_${Date.now()}`,
          name: "New Module",
          title: "New Module",
          slug: "",
          front_page: "README.md",
          lectures: []
        };
        current.mods.push(newItem);
        break;
      case 'lecture':
        newItem = {
          id: `L${Date.now()}`,
          weight: 10,
          title: "New Lecture",
          type: "lecture",
          source: {
            url: "",
            type: "local"
          }
        };
        current.lectures.push(newItem);
        break;
    }
    
    setData(newData);
  };

  const exportData = (): void => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'subjects-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const importedData: AppData = JSON.parse(result);
          setData(importedData);
        }
      } catch (error) {
        alert('Error parsing JSON file: ' + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const renderIcon = (iconName: string): JSX.Element => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <FaJava className="w-4 h-4" />;
  };

  const handleFormInputChange = (key: string, value: string | number): void => {
    setEditForm({ ...editForm, [key]: value });
  };

  const handleNestedFormInputChange = (key: string, subKey: string, value: string): void => {
    setEditForm({
      ...editForm,
      [key]: { ...editForm[key], [subKey]: value }
    });
  };

  const renderEditForm = (): JSX.Element | null => {
    if (!editingItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Edit Item</h3>
          
          {Object.keys(editForm).map((key: string) => {
            if (key === 'years' || key === 'mods' || key === 'lectures') return null;
            
            if (typeof editForm[key] === 'object' && editForm[key] !== null) {
              return (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium mb-1">{key}</label>
                  {Object.keys(editForm[key]).map((subKey: string) => (
                    <div key={subKey} className="ml-4 mb-2">
                      <label className="block text-xs text-gray-600">{subKey}</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={editForm[key][subKey] || ''}
                        onChange={(e) => handleNestedFormInputChange(key, subKey, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              );
            }
            
            return (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium mb-1">{key}</label>
                {key === 'icon' ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={editForm[key] || ''}
                    onChange={(e) => handleFormInputChange(key, e.target.value)}
                  >
                    {Object.keys(iconMap).map((iconName: string) => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                ) : key === 'type' && editForm.source ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={editForm[key] || ''}
                    onChange={(e) => handleFormInputChange(key, e.target.value)}
                  >
                    <option value="local">local</option>
                    <option value="remote">remote</option>
                  </select>
                ) : key === 'description' ? (
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={editForm[key] || ''}
                    onChange={(e) => handleFormInputChange(key, e.target.value)}
                  />
                ) : (
                  <input
                    type={typeof editForm[key] === 'number' ? 'number' : 'text'}
                    className="w-full p-2 border rounded"
                    value={editForm[key] || ''}
                    onChange={(e) => handleFormInputChange(
                      key, 
                      typeof editForm[key] === 'number' ? Number(e.target.value) : e.target.value
                    )}
                  />
                )}
              </div>
            );
          })}
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={saveEdit}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderLecture = (lecture: Lecture, lectureIndex: number, modPath: string): JSX.Element => {
    const lecturePath = `${modPath}.lectures.${lectureIndex}`;
    
    return (
      <div key={lecture.id} className="ml-8 p-2 border-l-2 border-purple-200">
        <div className="flex items-center gap-2">
          <span className="text-purple-600 font-medium">{lecture.title}</span>
          <span className="text-xs text-gray-500">({lecture.type}, weight: {lecture.weight})</span>
          <button
            onClick={() => startEdit(lecture, lecturePath)}
            className="p-1 text-blue-500 hover:bg-blue-100 rounded"
          >
            <FaEdit className="w-3 h-3" />
          </button>
          <button
            onClick={() => deleteItem(lecturePath)}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Source: {lecture.source?.url} ({lecture.source?.type})
        </div>
      </div>
    );
  };

  const renderMod = (mod: Module, modIndex: number, yearPath: string): JSX.Element => {
    const modPath = `${yearPath}.mods.${modIndex}`;
    const nodeId = `mod-${modPath}`;
    const isExpanded = expandedNodes.has(nodeId);
    
    return (
      <div key={mod.id} className="ml-6 p-2 border-l-2 border-blue-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleExpanded(nodeId)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
          </button>
          <span className="text-blue-600 font-medium">{mod.title}</span>
          <span className="text-xs text-gray-500">({mod.name})</span>
          <button
            onClick={() => addItem(modPath, 'lecture')}
            className="p-1 text-green-500 hover:bg-green-100 rounded"
          >
            <FaPlus className="w-3 h-3" />
          </button>
          <button
            onClick={() => startEdit(mod, modPath)}
            className="p-1 text-blue-500 hover:bg-blue-100 rounded"
          >
            <FaEdit className="w-3 h-3" />
          </button>
          <button
            onClick={() => deleteItem(modPath)}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-2">
            <div className="text-xs text-gray-600 mb-2">
              Slug: {mod.slug} | Front page: {mod.front_page}
            </div>
            {mod.lectures && mod.lectures.map((lecture: Lecture, lectureIndex: number) =>
              renderLecture(lecture, lectureIndex, modPath)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderYear = (year: Year, yearIndex: number, subjectPath: string): JSX.Element => {
    const yearPath = `${subjectPath}.years.${yearIndex}`;
    const nodeId = `year-${yearPath}`;
    const isExpanded = expandedNodes.has(nodeId);
    
    return (
      <div key={year.id} className="ml-4 p-2 border-l-2 border-green-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleExpanded(nodeId)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
          </button>
          {renderIcon(year.icon)}
          <span className="text-green-600 font-medium">{year.title}</span>
          <button
            onClick={() => addItem(yearPath, 'mod')}
            className="p-1 text-green-500 hover:bg-green-100 rounded"
          >
            <FaPlus className="w-3 h-3" />
          </button>
          <button
            onClick={() => startEdit(year, yearPath)}
            className="p-1 text-blue-500 hover:bg-blue-100 rounded"
          >
            <FaEdit className="w-3 h-3" />
          </button>
          <button
            onClick={() => deleteItem(yearPath)}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-2">
            <div className="text-xs text-gray-600 mb-2">{year.description}</div>
            {year.mods && year.mods.map((mod: Module, modIndex: number) =>
              renderMod(mod, modIndex, yearPath)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSubject = (subject: Subject, subjectIndex: number): JSX.Element => {
    const subjectPath = `Subjects.${subjectIndex}`;
    const nodeId = `subject-${subjectPath}`;
    const isExpanded = expandedNodes.has(nodeId);
    
    return (
      <div key={subject.id} className="p-3 border rounded-lg mb-3">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => toggleExpanded(nodeId)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? <FaChevronDown className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
          </button>
          {renderIcon(subject.icon)}
          <h3 className="text-lg font-semibold text-gray-800">{subject.title}</h3>
          <button
            onClick={() => addItem(subjectPath, 'year')}
            className="p-1 text-green-500 hover:bg-green-100 rounded"
          >
            <FaPlus className="w-4 h-4" />
          </button>
          <button
            onClick={() => startEdit(subject, subjectPath)}
            className="p-1 text-blue-500 hover:bg-blue-100 rounded"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteItem(subjectPath)}
            className="p-1 text-red-500 hover:bg-red-100 rounded"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">{subject.description}</div>
        
        {isExpanded && (
          <div>
            {subject.years && subject.years.map((year: Year, yearIndex: number) =>
              renderYear(year, yearIndex, subjectPath)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Educational Content Manager</h1>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaUpload /> Import
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaDownload /> Export
            </button>
            <button
              onClick={() => addItem('', 'subject')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              <FaPlus /> Add Subject
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Author & Social</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Author:</strong> {data.Author}
              <button
                onClick={() => startEdit({ Author: data.Author }, 'Author')}
                className="ml-2 p-1 text-blue-500 hover:bg-blue-100 rounded"
              >
                <FaEdit className="w-3 h-3" />
              </button>
            </div>
            <div>
              <strong>Social Links:</strong>
              <button
                onClick={() => startEdit(data.Social, 'Social')}
                className="ml-2 p-1 text-blue-500 hover:bg-blue-100 rounded"
              >
                <FaEdit className="w-3 h-3" />
              </button>
              <div className="text-xs text-gray-600 mt-1">
                {Object.entries(data.Social).map(([key, value]) => (
                  <div key={key}>{key}: {value || 'null'}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Subjects ({data.Subjects.length})</h2>
          {data.Subjects.map((subject: Subject, index: number) =>
            renderSubject(subject, index)
          )}
        </div>

        {renderEditForm()}
      </div>
    </div>
  );
};

export default SubjectsManager;