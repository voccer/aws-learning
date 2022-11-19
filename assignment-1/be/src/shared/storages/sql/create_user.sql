INSERT INTO
  m_users (
    email,
    status,
    password,
    firstname,
    lastname,
    firstname_kana,
    lastname_kana,
    phone_number,
    avatar,
    workspace_id,
    `role`,
    created_at,
    created_by
  )
VALUES
  (
    'admin@example.com',
    0,
    '$2b$10$JPWFRLOrkKqB2UtUekrzo.mrd19/vyt.2jb93qrXWKsgFJ5A9a2Xu',
    'admin',
    'admin',
    'admin',
    'admin',
    '012345677',
    'https://ahihi.com',
    0,
    999,
    CURRENT_TIMESTAMP,
    0
  );

-- pass: test1234, role: system-admin
INSERT INTO
  hrm_dev_db.m_users (
    email,
    status,
    password,
    firstname,
    lastname,
    firstname_kana,
    lastname_kana,
    phone_number,
    avatar,
    workspace_id,
    role,
    created_at,
    created_by
  )
VALUES
  (
    'duc.nguyen@pionero.io',
    0,
    '$2b$10$JPWFRLOrkKqB2UtUekrzo.mrd19/vyt.2jb93qrXWKsgFJ5A9a2Xu',
    'workspace admin',
    'workspace admin',
    'workspace admin',
    'workspace admin',
    '012345677',
    'https://ahihi.com',
    1,
    1,
    CURRENT_TIMESTAMP,
    0
  );

-- pass: test1234, role: workspace-admin
INSERT INTO
  hrm_dev_db.m_users (
    email,
    status,
    password,
    firstname,
    lastname,
    firstname_kana,
    lastname_kana,
    phone_number,
    avatar,
    workspace_id,
    role,
    created_at,
    created_by
  )
VALUES
  (
    'ntduc250798@gmail.com',
    0,
    '$2b$10$JPWFRLOrkKqB2UtUekrzo.mrd19/vyt.2jb93qrXWKsgFJ5A9a2Xu',
    'workspace user',
    'workspace user',
    'workspace user',
    'workspace user',
    '012345677',
    'https://ahihi.com',
    1,
    0,
    CURRENT_TIMESTAMP,
    0
  );

-- pass: test1234, role: workspace-user
DELETE FROM
  hrm_dev_db.m_workspaces
WHERE
  id = 2;