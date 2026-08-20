import { useState } from 'react';
import { Icon } from 'astro-iconset/react';

interface TabData {
  specifications: Record<string, string>;
  performance: Record<string, string>;
  features: string[];
  documentation: { name: string; url: string }[];
}

interface ProductTabsProps {
  tabData: TabData;
}

export default function ProductTabs({ tabData }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('specs');

  const tabs = [
    { id: 'specs', label: 'Specifications' },
    { id: 'performance', label: 'Performance' },
    { id: 'features', label: 'Features' },
    { id: 'docs', label: 'Documentation' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'specs':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {Object.entries(tabData.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-slate-100">
                    <td className="py-2 pr-6 font-medium text-slate-700">{key}</td>
                    <td className="py-2 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'performance':
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {Object.entries(tabData.performance).map(([key, value]) => (
                  <tr key={key} className="border-b border-slate-100">
                    <td className="py-2 pr-6 font-medium text-slate-700">{key}</td>
                    <td className="py-2 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'features':
        return (
          <ul className="space-y-2">
            {tabData.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Icon name="lucide:check-circle" className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        );
      case 'docs':
        return (
          <ul className="space-y-2">
            {tabData.documentation.map((doc, i) => (
              <li key={i}>
                <a
                  href={doc.url}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="lucide:file-text" className="w-4 h-4" />
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab 导航 */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="prose prose-sm max-w-none text-slate-600">
        {renderContent()}
      </div>
    </div>
  );
}