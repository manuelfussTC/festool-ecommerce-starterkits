import {expect,it} from 'vitest';
import spec from '../README.json';
it('stellt einen lesbaren Spielauftrag bereit',()=>{expect(spec.task.rules).toHaveLength(5);expect(spec.start_prompt).toContain('Schraubenfang');});
