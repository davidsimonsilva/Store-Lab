import React from 'react';
import { Product } from '../types';
import { getBasicDescription, getTechnicalSpecifications } from '../mock/specsMock';

interface TechnicalSpecsProps {
  product: Product;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ product }) => {
  return (
    <div className="tech-specs-grid">
      <div className="tech-specs-card">
        <h3 className="tech-specs-title">
          Descrição Básica do Produto
        </h3>
        <p className="tech-specs-text">
          {getBasicDescription(product)}
        </p>
      </div>

      <div className="tech-specs-card">
        <h3 className="tech-specs-title">
          Descrição Técnica do Produto
        </h3>
        
        <div className="tech-table-container">
          <table className="tech-table">
            <tbody>
              {getTechnicalSpecifications(product).map((spec, i) => (
                <tr 
                  key={i} 
                  className={`tech-table-row ${i % 2 === 0 ? 'tech-table-row-even' : ''}`}
                >
                  <th className="tech-table-th">
                    {spec.label}
                  </th>
                  <td className="tech-table-td">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
