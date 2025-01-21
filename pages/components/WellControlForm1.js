import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Lock, 
  Unlock, 
  Save, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  FileText,
  Users,
  AlertTriangle,
  MessageCircle,
  Settings,
  Bell,
  Wrench,
  BarChart2,
  CheckSquare,
  Book,
  AlertCircle
} from 'lucide-react';

const sections = {
  introduction: {
    title: "1. Introduction",
    icon: FileText
  },
  roles: {
    title: "2. Roles and Responsibilities",
    icon: Users
  },
  wellControlAssessment: {
    title: "3. Well Control Assessment",
    icon: AlertTriangle
  },
  communicationFlow: {
    title: "4. Communication Flow",
    icon: MessageCircle
  },
  wellControlPlan: {
    title: "5. Well Control Plan",
    icon: Settings
  },
  alarmManagement: {
    title: "6. Alarm Management",
    icon: Bell
  },
  wellControlEquipment: {
    title: "7. Well Control Equipment",
    icon: Wrench
  },
  bopShearability: {
    title: "8. BOP Shearability",
    icon: BarChart2
  },
  bopTesting: {
    title: "9. BOP Testing",
    icon: CheckSquare
  },
  trainingAndDrills: {
    title: "10. Training and Drills",
    icon: Book
  },
  emergencyResponse: {
    title: "11. Emergency Response",
    icon: AlertCircle
  }
};

const CompleteBridgingDocForm = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState('introduction');
  
  const [formData, setFormData] = useState({
    introduction: {
      content: ""
    },
    roles: {
      content: ""
    },
    wellControlAssessment: {
      assessmentTable: [{
        description: "",
        petronasReference: "",
        petronasDescription: "",
        nobleReference: "",
        nobleDescription: "",
        interfaceComments: ""
      }]
    },
    communicationFlow: {
      content: ""
    },
    wellControlPlan: {
      content: ""
    },
    alarmManagement: {
      content: ""
    },
    wellControlEquipment: {
      content: ""
    },
    bopShearability: {
      content: ""
    },
    bopTesting: {
      content: ""
    },
    trainingAndDrills: {
      content: ""
    },
    emergencyResponse: {
      content: ""
    }
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddTableRow = () => {
    setFormData(prev => ({
      ...prev,
      wellControlAssessment: {
        ...prev.wellControlAssessment,
        assessmentTable: [
          ...prev.wellControlAssessment.assessmentTable,
          {
            description: "",
            petronasReference: "",
            petronasDescription: "",
            nobleReference: "",
            nobleDescription: "",
            interfaceComments: ""
          }
        ]
      }
    }));
  };

  const handleDeleteTableRow = (index) => {
    setFormData(prev => ({
      ...prev,
      wellControlAssessment: {
        ...prev.wellControlAssessment,
        assessmentTable: prev.wellControlAssessment.assessmentTable.filter((_, i) => i !== index)
      }
    }));
  };

  const renderInput = (label, value, onChange, multiline = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      {multiline ? (
        <textarea
          className="w-full p-2 border rounded"
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  );

  const renderSection = (section) => {
    const SectionIcon = sections[section].icon;
    
    return (
      <div 
        className={`p-4 cursor-pointer ${activeSection === section ? 'bg-blue-50' : ''}`}
        onClick={() => setActiveSection(section)}
      >
        <div className="flex items-center gap-2">
          <SectionIcon size={20} />
          <span className="font-medium">{sections[section].title}</span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">1.0 Introduction, Document Purpose & Scope</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[200px]"
                value={formData.introduction.content}
                onChange={e => handleInputChange('introduction', 'content', e.target.value)}
                placeholder="Paste the introduction content here..."
              />
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">2.0 Roles and Responsibilities</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[400px]"
                value={formData.roles.content}
                onChange={e => handleInputChange('roles', 'content', e.target.value)}
                placeholder="Paste the roles and responsibilities content here..."
              />
            </div>
          </div>
        );
      
      case 'wellControlAssessment':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">PETRONAS Reference</th>
                  <th className="border p-2">PETRONAS Description</th>
                  <th className="border p-2">NOBLE Reference</th>
                  <th className="border p-2">NOBLE Description</th>
                  <th className="border p-2">Interface Comments</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.wellControlAssessment.assessmentTable.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <input
                        className="w-full p-1 border rounded"
                        value={row.description}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].description = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        className="w-full p-1 border rounded"
                        value={row.petronasReference}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].petronasReference = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                      />
                    </td>
                    <td className="border p-2">
                      <textarea
                        className="w-full p-1 border rounded"
                        value={row.petronasDescription}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].petronasDescription = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                        rows={3}
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        className="w-full p-1 border rounded"
                        value={row.nobleReference}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].nobleReference = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                      />
                    </td>
                    <td className="border p-2">
                      <textarea
                        className="w-full p-1 border rounded"
                        value={row.nobleDescription}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].nobleDescription = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                        rows={3}
                      />
                    </td>
                    <td className="border p-2">
                      <textarea
                        className="w-full p-1 border rounded"
                        value={row.interfaceComments}
                        onChange={e => {
                          const newTable = [...formData.wellControlAssessment.assessmentTable];
                          newTable[index].interfaceComments = e.target.value;
                          handleInputChange('wellControlAssessment', 'assessmentTable', newTable);
                        }}
                        rows={3}
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDeleteTableRow(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddTableRow}
              className="mt-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              <Plus size={16} /> Add Row
            </button>
          </div>
        );
      
      // Add other section renders as needed
      case 'communicationFlow':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">4.0 Well Control Management Team Communication Flow</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.communicationFlow.content}
                onChange={e => handleInputChange('communicationFlow', 'content', e.target.value)}
                placeholder="Paste the communication flow content here..."
              />
            </div>
          </div>
        );

      case 'wellControlPlan':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">5.0 Well Control Plan</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.wellControlPlan.content}
                onChange={e => handleInputChange('wellControlPlan', 'content', e.target.value)}
                placeholder="Paste the well control plan content here..."
              />
            </div>
          </div>
        );

      case 'alarmManagement':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">6.0 Alarm Management</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.alarmManagement.content}
                onChange={e => handleInputChange('alarmManagement', 'content', e.target.value)}
                placeholder="Paste the alarm management content here..."
              />
            </div>
          </div>
        );

      case 'wellControlEquipment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">7.0 Well Control Equipment</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.wellControlEquipment.content}
                onChange={e => handleInputChange('wellControlEquipment', 'content', e.target.value)}
                placeholder="Paste the well control equipment content here..."
              />
            </div>
          </div>
        );

      case 'bopShearability':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">8.0 BOP Shearability Table</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.bopShearability.content}
                onChange={e => handleInputChange('bopShearability', 'content', e.target.value)}
                placeholder="Paste the BOP shearability content here..."
              />
            </div>
          </div>
        );

      case 'bopTesting':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">9.0 BOP and Control System Testing</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.bopTesting.content}
                onChange={e => handleInputChange('bopTesting', 'content', e.target.value)}
                placeholder="Paste the BOP testing content here..."
              />
            </div>
          </div>
        );

      case 'trainingAndDrills':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">10.0 Training and Drills</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.trainingAndDrills.content}
                onChange={e => handleInputChange('trainingAndDrills', 'content', e.target.value)}
                placeholder="Paste the training and drills content here..."
              />
            </div>
          </div>
        );

      case 'emergencyResponse':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">11.0 Well Control Incident Response Plan</label>
              <textarea
                className="w-full p-3 border rounded-lg min-h-[300px]"
                value={formData.emergencyResponse.content}
                onChange={e => handleInputChange('emergencyResponse', 'content', e.target.value)}
                placeholder="Paste the emergency response content here..."
              />
            </div>
          </div>
        );

      default:
        return <div>Please select a section to edit</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Well Control Bridging Document
            <span className="flex items-center gap-2">
              {isAdmin ? (
                <><Lock className="text-green-500" /> Admin Access</>
              ) : (
                <><Unlock className="text-blue-500" /> Client Access</>
              )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="col-span-1 border rounded-lg">
              {Object.keys(sections).map(section => renderSection(section))}
            </div>
            
            {/* Content Area */}
            <div className="col-span-3 border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{sections[activeSection].title}</h2>
              {renderContent()}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button 
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => alert('Changes saved!')}
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>

          {/* Role Indicator */}
          <Alert className="mt-4">
            <AlertDescription>
              {isAdmin 
                ? "Administrator mode: Full access to all fields"
                : "Client mode: Limited to updating specific operational data"
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteBridgingDocForm;
