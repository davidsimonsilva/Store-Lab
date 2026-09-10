import { securityService, hashPasswordSimulated, verifyPassword, sanitizeInput, sanitizeObject } from '../../services/securityService';
import { authService } from '../../services/authService';

describe('Security Service & Auth Service (Fase 6)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('securityService - Hashing e Sanitização', () => {
    test('gera hash salgado simulado e verifica corretamente a senha', () => {
      const rawPassword = 'MinhaSenhaFort3!';
      const hash = hashPasswordSimulated(rawPassword);

      expect(hash).toMatch(/^(sl_hash_|sec_hash_)/);
      expect(hash).not.toEqual(rawPassword);

      expect(verifyPassword(rawPassword, hash)).toBe(true);
      expect(verifyPassword('SenhaIncorreta', hash)).toBe(false);
    });

    test('suporta compatibilidade legada temporária para senhas sem hash', () => {
      const legacyPassword = 'senhaLegacy123';
      expect(verifyPassword(legacyPassword, legacyPassword)).toBe(true);
      expect(verifyPassword('errada', legacyPassword)).toBe(false);
    });

    test('sanitiza código HTML e scripts maliciosos (XSS) em entradas de texto', () => {
      const maliciousXSS = '<script>alert("XSS")</script>João <iframe src="evil.com"></iframe>Silva';
      const cleanText = sanitizeInput(maliciousXSS);

      expect(cleanText).not.toContain('<script>');
      expect(cleanText).not.toContain('<iframe>');
      expect(cleanText).toBe('João Silva');
    });

    test('sanitiza URLs e eventos perigosos em formulários', () => {
      const dirty = '<b onclick="doBadThings()">Clique</b> javascript:alert(1)';
      const clean = sanitizeInput(dirty);

      expect(clean).not.toContain('onclick=');
      expect(clean).not.toContain('javascript:');
      expect(clean).toBe('Clique alert(1)');
    });

    test('sanitiza objetos complexos recursivamente', () => {
      const inputObject = {
        name: '<b>Maria</b> <script>bad()</script>',
        details: {
          bio: 'Engenheira <iframe src="x"></iframe>',
          tags: ['<script>x</script>Tech', 'Store'],
        },
        age: 30,
      };

      const sanitized = sanitizeObject(inputObject);

      expect(sanitized.name).toBe('Maria');
      expect(sanitized.details.bio).toBe('Engenheira');
      expect(sanitized.details.tags).toEqual(['Tech', 'Store']);
      expect(sanitized.age).toBe(30);
    });
  });

  describe('authService - Cadastro e Autenticação Segura', () => {
    test('cadastra usuário salvando hash salgado de senha e sanitizando campos', () => {
      const registerDTO = {
        name: 'Carlos <b>Tester</b>',
        email: 'CARLOS@STORELAB.COM ',
        password: 'SenhaMaster10#',
        cpf: '529.982.247-25',
      };

      const result = authService.registerUser(registerDTO);

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user?.name).toBe('Carlos Tester');
      expect(result.user?.email).toBe('carlos@storelab.com');

      const usersInStorage = authService.getRegisteredUsers();
      expect(usersInStorage.length).toBe(1);
      expect(usersInStorage[0].passwordHash).toMatch(/^(sl_hash_|sec_hash_)/);
      expect(usersInStorage[0].passwordHash).not.toContain('SenhaMaster10#');
    });

    test('impede cadastro de e-mail ou CPF duplicados', () => {
      const user1 = {
        name: 'Usuario Um',
        email: 'duplicado@storelab.com',
        password: 'SenhaFort3!1',
        cpf: '529.982.247-25',
      };

      const user2 = {
        name: 'Usuario Dois',
        email: 'duplicado@storelab.com', 
        password: 'SenhaFort3!2',
        cpf: '123.456.789-01',
      };

      authService.registerUser(user1);
      const duplicateEmailResult = authService.registerUser(user2);

      expect(duplicateEmailResult.success).toBe(false);
      expect(duplicateEmailResult.error).toContain('e-mail já está cadastrado');

      const user3 = {
        name: 'Usuario Tres',
        email: 'outro@storelab.com',
        password: 'SenhaFort3!3',
        cpf: '529.982.247-25', 
      };

      const duplicateCpfResult = authService.registerUser(user3);
      expect(duplicateCpfResult.success).toBe(false);
      expect(duplicateCpfResult.error).toContain('CPF já está associado');
    });

    test('autentica usuário com sucesso usando hash de senha correto', () => {
      authService.registerUser({
        name: 'Fernanda Lima',
        email: 'fernanda@storelab.com',
        password: 'Password123!',
        cpf: '123.456.789-00',
      });

      const authSuccess = authService.authenticateUser('FERNANDA@STORELAB.COM', 'Password123!');
      expect(authSuccess.success).toBe(true);
      expect(authSuccess.user?.name).toBe('Fernanda Lima');

      const authFailPassword = authService.authenticateUser('fernanda@storelab.com', 'SenhaErrada!');
      expect(authFailPassword.success).toBe(false);
      expect(authFailPassword.error).toContain('inválidos');

      const authFailEmail = authService.authenticateUser('naoexistente@storelab.com', 'Password123!');
      expect(authFailEmail.success).toBe(false);
      expect(authFailEmail.error).toContain('inválidos');
    });
  });
});
